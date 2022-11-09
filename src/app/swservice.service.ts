import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  defer,
  from,
  map,
  merge,
  Observable,
  of,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { Person } from './models/person';
import { PersonPagination } from './models/personPagination';

@Injectable({
  providedIn: 'root',
})
export class SwService {
  private ROOT_PATH: string = 'http://swapi.dev/api/';
  private PERSON_ROUTE: string = 'people/';

  constructor(private http: HttpClient) {}

  getPerson(id: number = 1): Observable<Person> {
    /**
     * Os métodos do cliente HTTP já retornam por padrão um observable
     * com a tipagem inferida em sua chamada.
     *
     * No caso abaixo isso já se adequa diretamente ao objetivo deste método,
     * que é carregar um único personagem.
     */
    return this.http.get<Person>(this.ROOT_PATH + this.PERSON_ROUTE + id);
  }

  getPagePeople(page: number = 0): Observable<Person[]> {
    /**
     * Abaixo já precisamos de algo diferente: a api retorna um formato PersonPagination,
     * mas desejamos fornecer, de forma reativa, apenas a lista de personagens de
     * cada página.
     *
     * O operador switchMap altera a tipagem do observable recebido por ele pela
     * tipagem do seu retorno. Isso nos permite extrair por meio da arrow function
     * os dados que desejamos, construir a lógica e o objeto que precisarmos
     * e retornar o que é objetivo do método: os personagens naquela página.
     */

    let endpoint = this.ROOT_PATH + this.PERSON_ROUTE;

    return this.http
      .get<PersonPagination>(endpoint + (page > 0 ? `?page=${page}` : ''))
      .pipe(
        switchMap(({ results }) => {
          return of(results);
        })
      );
  }

  getPeople(): Observable<Person[]> {
    /**
     * Conhecimento prévio: a API faz paginação de 10 em 10. A última página não tem 10, atualmente.
     *
     * Lógica: será que posso carregar de página a página e concatenar os personagens numa
     * lista apenas?
     *
     * Como seria feito de forma convencional?
     * - Uma lista vazia
     * - Um laço chama o endpoint página a página
     * - Dentro do laço anexamos à lista cada bloco de personagens obtidos
     *
     * Como seria na abordagem reativa?
     * Com isso em mente a sequência de operadores no retorno do pedido da primeira página:
     * - Recursão da próxima página
     * - Caso seja a última retorna o PersonPagination da última, encerrando a recursão
     * - Caso não seja a última a recursão encadeia uma concatenação do que foi carregado atual, com o
     *    carregado da próxima (que em recursão terá o da próxima até a última)
     *
     * Em outras palavras, loader retorna um PersonPagination onde results acumula todos os personagens.
     *
     * Observando os operadores: o switchMap não foi usado para alterar a tipagem.
     * No observable de cada chamada a loader aplicamos o operador map para
     * destruturar o data da primeira chamada e trocar seu results por uma concatenação
     * dos seus results com todos os que vieram em cadeia da recursão.
     *
     * Visto que queremos retornar a lista total de personagens, precisamos converter
     * para um Observable<Person[]>.
     * Por isso aplicamos mais um switchMap para adequar ao retorno de um Observable<Person[]> apenas.
     *
     * Lição: podemos encadear operadores dentro do pipe os separando por vírgulas ou aplicar pipe
     * no observable gerado anteriormente.
     */

    const loader = (url: string, page: number = 1) =>
      this.http.get<PersonPagination>(url + `?page=${page}`).pipe(
        switchMap((data): Observable<PersonPagination> => {
          if (data.results.length >= 10) {
            return loader(url, page + 1).pipe(
              map((res: PersonPagination) => ({
                ...data,
                results: [...data.results, ...res.results],
              }))
            );
          }
          return of(data);
        })
      );
    return loader(this.ROOT_PATH + this.PERSON_ROUTE).pipe(
      switchMap((page) => of(page.results))
    );
  }
}

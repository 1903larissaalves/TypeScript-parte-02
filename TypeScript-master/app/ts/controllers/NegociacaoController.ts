import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { logarTempoExecucao } from '../helpers/decorators/index';
import {NegociacaoParcial} from '../models/index';

export class NegociacaoController{

    private _data: JQuery;
    private _quantidade: JQuery;
    private _valor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView("#negociacoesView");
    private _mensagemView = new MensagemView("#mensagemView");

    constructor(){
        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");
        this._negociacoesView.update(this._negociacoes);
    }
    @logarTempoExecucao()
    adiciona(event: Event){

        event.preventDefault();

        let data = new Date(this._data.val().replace(/-/g, ','));

        if(!this._diaUtil(data)){
            this._mensagemView.update("Não é possível cadastrar negocição fora de dia úteis");
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._quantidade.val()),
            parseFloat(this._valor.val())
        );


        this._negociacoes.paraArray().forEach(negociacao =>{
            console.log(negociacao.data);
            console.log(negociacao.quantidade);
            console.log(negociacao.valor);
            
        });

        
        this._negociacoes.adiciona(negociacao);
        
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociação adicionada com sucesso!");
        console.log(negociacao);
        
    }

    _diaUtil(data: Date){
        return data.getDay() != DiaSemana.sabado && data.getDay() != DiaSemana.domingo;
    }

    importaDados(){
        function ok(res: Response) {

            if(res.ok) {
                return res;
                
            } else {
                throw new Error(res.statusText);
            }            
        }
        fetch('http://localhost:8080/dados')
            .then(res => ok(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => {
                dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
            })
            .catch(err => console.log(err.message));
    }
}

enum DiaSemana{
    domingo,
    segunda,
    terca,
    quarta, 
    quinta,
    sexta,
    sabado
}
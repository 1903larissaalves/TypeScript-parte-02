import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';

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
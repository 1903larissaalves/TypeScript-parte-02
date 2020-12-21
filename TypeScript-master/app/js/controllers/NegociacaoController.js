System.register(["../views/index", "../models/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, NegociacaoController, DiaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesView("#negociacoesView");
                    this._mensagemView = new index_1.MensagemView("#mensagemView");
                    this._data = $("#data");
                    this._quantidade = $("#quantidade");
                    this._valor = $("#valor");
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this._data.val().replace(/-/g, ','));
                    if (!this._diaUtil(data)) {
                        this._mensagemView.update("Não é possível cadastrar negocição fora de dia úteis");
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this._quantidade.val()), parseFloat(this._valor.val()));
                    this._negociacoes.paraArray().forEach(negociacao => {
                        console.log(negociacao.data);
                        console.log(negociacao.quantidade);
                        console.log(negociacao.valor);
                    });
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update("Negociação adicionada com sucesso!");
                    console.log(negociacao);
                }
                _diaUtil(data) {
                    return data.getDay() != DiaSemana.sabado && data.getDay() != DiaSemana.domingo;
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiaSemana) {
                DiaSemana[DiaSemana["domingo"] = 0] = "domingo";
                DiaSemana[DiaSemana["segunda"] = 1] = "segunda";
                DiaSemana[DiaSemana["terca"] = 2] = "terca";
                DiaSemana[DiaSemana["quarta"] = 3] = "quarta";
                DiaSemana[DiaSemana["quinta"] = 4] = "quinta";
                DiaSemana[DiaSemana["sexta"] = 5] = "sexta";
                DiaSemana[DiaSemana["sabado"] = 6] = "sabado";
            })(DiaSemana || (DiaSemana = {}));
        }
    };
});

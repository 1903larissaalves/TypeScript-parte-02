System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoExecucao() {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                console.log("---------------------------------------");
                console.log(`Paramentros passados para o metodo ${propertyKey}: ${JSON.stringify(args)}`);
                const tempo01 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                const tempo02 = performance.now();
                console.log(`O retorno do metodo ${propertyKey} é ${JSON.stringify(retorno)}`);
                console.log(`O metodo ${propertyKey} demorou ${tempo02 - tempo01} ms`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoExecucao", logarTempoExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});

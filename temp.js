
              window.addTM = function(val) {
                const el = document.getElementById('tipoManutencao');
                if(!el) return;
                let arr = el.value.split(',').map(x => x.trim()).filter(x => x);
                if (!arr.includes(val)) arr.push(val);
                el.value = arr.join(', ');
              };
            
function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

function empty(div) {
    while (div.lastChild) {
        div.lastChild.remove();
    }
}

document.querySelector('#go').addEventListener('click', async function (evt) {
    let str = document.querySelector('#str').value;
    let pat = document.querySelector('#pat').value;
    let res = document.querySelector('#res');
    let strdiv = document.querySelector('#strdiv');
    let pdiv = document.querySelector('#ptndiv');
    let index = document.querySelector('#index');
    empty(res);
    empty(strdiv);
    empty(pdiv);
    empty(index);
    let ptndiv = document.createElement('div');
    pdiv.appendChild(ptndiv);
    let slen = str.length;
    let plen = pat.length;
    const lps = [];
    lps[0] = 0;
    for (let i = 1; i < plen; i++) {
        let j = lps[i - 1];
        while (j > 0 && pat[i] != pat[j]) {
            j = lps[j - 1];
        }
        if (pat[i] == pat[j])
            j++;
        lps[i] = j;
    }

    for (let i = 0; i < slen; i++) {
        const x = document.createElement('span');
        x.innerText = str[i];
        x.setAttribute('id', `s${i}`);
        strdiv.appendChild(x);
        const y = document.createElement('span');
        y.innerText = i;
        y.setAttribute('id', `i${i}`);
        index.appendChild(y);
    }
    for (let i = 0; i < plen; i++) {
        const y = document.createElement('span');
        y.innerText = pat[i];
        y.setAttribute('id', `p${i}`);
        ptndiv.appendChild(y);
    }
    await delay(1);
    let i = 0, j = 0, curmargin = 0;
    while (i < slen) {
        if (i > 0) {
            let curi = document.querySelector(`#s${(i - 1)}`);
            curi.style.color = 'aliceblue';
        }
        let curi = document.querySelector(`#s${i}`);
        curi.style.color = '#6cdde5';
        document.querySelector(`#i${i}`).style.color = '#6cdde5';
        await delay(0.5);
        if (str[i] == pat[j]) {
            document.querySelector(`#p${j}`).style.color = '#a1e096';
            i++;
            j++;
            if (j == plen) {
                const x = document.createElement('div');
                x.innerText = "Pattern found at " + (i - j);
                document.querySelector(`#i${i - j}`).style.color = '#a1e096';
                res.appendChild(x);
                await delay(0.5);
                curmargin += 30 * (j - lps[j - 1]);
                j = lps[j - 1];

            }
        } else if (i < slen && str[i] != pat[j]) {
            document.querySelector(`#p${j}`).style.color = 'red';
            if (j > 0) {
                curmargin += 30 * (j - lps[j - 1]);
                j = lps[j - 1];

            }
            else {
                curmargin += 30;
                i++;
            }
        }
        console.log(i + " " + j + " " + curmargin);
        await delay(2);
        for (let k = j; k < plen; k++) {
            document.querySelector(`#p${k}`).style.color = 'aliceblue';
        }
        ptndiv.style.transform = `translateX(${curmargin}px)`;
        await delay(0.5);
    }
    document.querySelector(`#s${slen - 1}`).style.color = 'aliceblue';
});



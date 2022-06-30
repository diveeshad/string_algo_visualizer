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

document.querySelector('#go2').addEventListener('click', async function (evt) {
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

    for (let i = 0; i < slen; i++) {
        const x = document.createElement('span');
        x.innerText = str[i];
        x.setAttribute('id', `s${i}`);
        strdiv.appendChild(x);
        const y = document.createElement('span');
        y.innerText = "-";
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
    let curmargin = 0;

    for (let i = 0; i <= slen - plen; i++) {
        if (i > 0) {
            let curi = document.querySelector(`#s${(i - 1)}`);
            if (!curi.classList.contains('found'))
                curi.style.color = 'aliceblue';
            else
                curi.style.color = '#a1e096';
        }
        let curi = document.querySelector(`#s${i}`);
        curi.style.color = '#6cdde5';
        document.querySelector(`#i${i}`).style.color = '#6cdde5';
        await delay(1);

        let chk = 1;
        for (let j = 0; j < plen; j++) {
            console.log(i + " " + j);

            document.querySelector(`#s${i + j}`).style.color = '#6cdde5';
            if (str[i + j] != pat[j]) {
                document.querySelector(`#p${j}`).style.color = 'red';
                chk = 0;
                break;
            } else {
                document.querySelector(`#p${j}`).style.color = '#a1e096';
            }
            await delay(1);
            let curj = document.querySelector(`#s${(i + j)}`);
            if (!curj.classList.contains('found'))
                curj.style.color = 'aliceblue';
            else
                curj.style.color = '#a1e096';
        }
        if (chk) {
            const x = document.createElement('div');
            x.innerText = "Pattern found at index " + i;
            res.appendChild(x);
            document.querySelector(`#i${i}`).style.color = '#a1e096';
            document.querySelector(`#i${i}`).innerText = '*';
            for (let j = 0; j < plen; j++) {
                document.querySelector(`#s${i + j}`).style.color = '#a1e096';
                document.querySelector(`#s${i + j}`).setAttribute('class', `found`);
            }
        }
        await delay(1);
        curmargin += 30;
        for (let j = 0; j < plen; j++) {
            document.querySelector(`#p${j}`).style.color = 'aliceblue';
        }
        ptndiv.style.transform = `translateX(${curmargin}px)`;
        await delay(1);
    }
    for (let i = 0; i < plen; i++)
        document.querySelector(`#p${i}`).innerText = '';
    for (let i = 0; i < slen; i++) {
        let curi = document.querySelector(`#s${i}`);
        if (!curi.classList.contains('found'))
            curi.style.color = 'aliceblue';
        else
            curi.style.color = '#a1e096';
    }
});
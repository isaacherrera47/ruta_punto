const axios = require('axios');
const puppeteer = require('puppeteer');

const params = new URLSearchParams();
const url = 'http://app.sct.gob.mx/sibuac_internet/ControllerUI?action=cmdSolRutas';

params.append('edoOrigen', '22');
params.append('edoDestino', '25');
params.append('ciudadOrigen', '22110');
params.append('ciudadDestino', '25270');
params.append('vehiculos', '2');
params.append('red', 'simplificada');
params.append('tipo', '1');

(async () => {
    const {data} = await axios.post(url, params, {responseType: 'arraybuffer'});
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(data.toString('latin1'));
    await page.evaluate(() => {
        const table = document.querySelectorAll('#tContenido tr');
        table.deleteRow(0);
        table.deleteRow(table.rows.length - 1);
        table.deleteRow(table.rows.length - 1);
        table.deleteRow(table.rows.length - 1);
        table.deleteRow(table.rows.length - 1);
    });
    const logo = await page.$('table#tContenido');
    await logo.screenshot({
        path: 'example.png'
    });

    await browser.close();
})();
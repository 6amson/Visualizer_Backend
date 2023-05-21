const { text } = require("express");
const { set } = require("express/lib/application");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const pdfPath = "./assets/accountt.pdf";


// const loadingTask = pdfjsLib.getDocument(pdfPath);
// loadingTask.promise.then(function (doc) {
//     const numPages = doc.numPages;
//     console.log("# Document Loaded");
//     console.log("Number of Pages: " + numPages);

// }).catch(err => { console.log(err) });

(async function load() {
    const loadingTask = pdfjsLib.getDocument({ url: pdfPath });
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    const page = await pdfDocument.getPage(1);
    const textContent = await page.getTextContent();

    // console.log(textContent.items);

    const schemaRaw = [
        {
            date: '',
            details: '',
            debit: '',
            credit: '',
            balance: '',
        }
    ];

    //Get position y of all text content, which is the row






    // define a reg expression to match Date string
    const patternDate = /^Date$/;

    const test1 = textContent.items.filter((item) => {
        const matchDate = patternDate.test(item.str);

        if (matchDate) {
            return item;
        }
    });

    const datePositionY = test1[0].transform[5];

    let rawPositionY = [];
    let finalDetail = [];
    let finalDate = [];
    let finalWithdrawal = [];
    let finalLodgement = [];
    let finalBalance = [];
    const dateX = 38.25;
    const detailX = 104.11;
    const withdrawalX = 426.7;
    const lodgementX = 472.13;
    const balanceX = 517.72;

    textContent.items.forEach((item, index, arr) => {
        // console.log(item);

        //filter out empty strings.
        if (item.height > 0) {
            rawPositionY.push(item.transform[5]);
        }


    });

    //create a set to filter the positionY (rows)
    const rawSetPositionY = new Set(rawPositionY);


    //create an array from the set, cos sets returns an object.
    const positionY = Array.from(rawSetPositionY);

    //filter for rows below the Date row
    const finalPositionY = positionY.filter((element) => {
        return element < datePositionY;
    })

    textContent.items.forEach(item => {

        if (item.height > 0) {
            for (const positions of finalPositionY) {
                if (item.transform[4] == dateX && item.transform[5] == positions) {
                    finalDate.push(item.str);
                }else if (item.transform[4] == detailX && item.transform[5] == positions) {
                    finalDetail.push(item.str);
                } else if (item.transform[4] == withdrawalX && item.transform[5] == positions) {
                    finalWithdrawal.push(item.str);
                }
                else if (item.transform[4] == lodgementX && item.transform[5] == positions) {
                    finalLodgement.push(item.str);
                }
                else if (item.transform[4] == balanceX && item.transform[5] == positions) {
                    finalBalance.push(item.str);
                }
            }
        }
    });


    console.log(finalBalance);
    console.log("Number of Pages: " + numPages);


    page.cleanup();
}
)()




module.exports.test_get = (req, res) => {
    res.send('Hello wide world');
}

module.exports.parsepdf_post = (req, res) => {
    res.send('who cares about post');
}
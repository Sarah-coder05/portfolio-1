

function generateRandId() {
    let _output = "";
    var captchaStr = "";
    let alphaNums = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
    ];

    function generateTdId() {
        //let emptyArr = [];
        let emptyStr = "";
        let emptyArr = Array.from({ length: 5 }, (e) => []);

        for (let i = 1; i <= 8; i++) {
            emptyArr[0].push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
            //emptyStr = emptyStr.concat(" ", alphaNums[Math.floor(Math.random() * alphaNums.length)])
        }
        captchaStr = captchaStr.concat("", emptyArr[0].join(""));
        for (let i = 1; i <= 4; i++) {
            emptyArr[1].push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
            //emptyStr = emptyStr.concat(" ", alphaNums[Math.floor(Math.random() * alphaNums.length)])
        }
        captchaStr = captchaStr.concat("-", emptyArr[1].join(""));
        for (let i = 1; i <= 4; i++) {
            emptyArr[2].push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
            //emptyStr = emptyStr.concat(" ", alphaNums[Math.floor(Math.random() * alphaNums.length)])
        }
        captchaStr = captchaStr.concat("-", emptyArr[2].join(""));
        for (let i = 1; i <= 4; i++) {
            emptyArr[3].push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
            //emptyStr = emptyStr.concat(" ", alphaNums[Math.floor(Math.random() * alphaNums.length)])
        }
        captchaStr = captchaStr.concat("-", emptyArr[3].join(""));
        for (let i = 1; i <= 12; i++) {
            emptyArr[4].push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
            //emptyStr = emptyStr.concat(" ", alphaNums[Math.floor(Math.random() * alphaNums.length)])
        }

        captchaStr = captchaStr.concat("-", emptyArr[4].join(""));

        // ctx.clearRect(0, 0, captchaText.width, captchaText.height);
        // ctx.fillText(captchaStr, captchaText.width/4, captchaText.height/2);

        //return emptyArr;
        return {
            emptyArr,
            captchaStr,
            // emptyStr
        };
    }

    const resl = generateTdId();
    //_output = resl[0.join('')],
    //console.log({resl})
    _output = resl.captchaStr;

    return `id${_output}`;
}










// ==========================================================================================

function htmlElementToJson(elementId) {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Element with ID ${elementId} not found.`);
        return null;
    }

    const nodes = [];

    function parseNode(node) {
        const result = {
            _id: generateRandId(),
            tag: node.tagName.toLowerCase(),
            classes: Array.from(node.classList),
            data: {},
            children: [],
        };

        // Extract attributes
        Array.from(node.attributes).forEach((attr) => {
            if (attr.name !== 'class' && attr.name !== 'id') {
                if (attr.name == "data-type") {
                    result.type = attr.value;
                } else {
                    result.data[attr.name] = attr.value;
                }
            }
        });

        // Process child nodes
        Array.from(node.childNodes).forEach((childNode) => {
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                const childResult = parseNode(childNode);
                result.children.push(childResult._id);
                nodes.push(childResult);
            } else if (childNode.nodeType === Node.TEXT_NODE) {
                const textContent = childNode.textContent.trim();
                if (textContent !== '') {
                    const textNode = {
                        _id: generateRandId(),
                        text: true,
                        v: textContent,
                    };
                    result.children.push(textNode._id);
                    nodes.push(textNode);
                }
            }
        });

        return result;
    }

    const rootNode = parseNode(element);
    nodes.push(rootNode);

    // Move the root node to the beginning of the array
    nodes.unshift(nodes.pop());
    return nodes;
}

// Example usage
const elementId = `workmain`; // Replace with the actual ID of your HTML element
const nodesArray = htmlElementToJson(elementId);

if (nodesArray) {
    console.log(nodesArray);
}




//  ========================C O N V E R T ======== C S S ==================



function transformCssToJson(cssString) {
    const jsonResult = [];
    const VarientArr = [];

    const parseCssRules = (cssRules) => {
        for (const cssRule of cssRules) {
            const { selectorText, style } = cssRule;
            const [className, ...variants] = selectorText.split('.');
            // console.log(cssRule,variants);
            if (cssRule.parentRule != null) {
                VarientArr.push(cssRule)
            } else {
                const id = generateRandomId(); // You need to implement your own ID generation logic

                const jsonItem = {
                    style_id: id,
                    data: {
                        comb: "",
                        affects: {},
                        children: [],
                        name: className,
                        sel: selectorText,
                        styleLess: style.cssText,
                        type: "class",
                        variants: {}
                    }
                }
                jsonResult.push(jsonItem);
            };

        }
    };

    const generateRandomId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };

    // Parse the CSS string
    const styleElement = document.createElement('style');
    styleElement.textContent = cssString;
    document.head.appendChild(styleElement);

    const styleSheet = styleElement.sheet;

    // Handle media queries
    for (const cssRule of styleSheet.cssRules) {
        if (cssRule.type === CSSRule.MEDIA_RULE) {
            parseCssRules(cssRule.cssRules);
        } else if (cssRule.type === CSSRule.STYLE_RULE) {
            parseCssRules([cssRule]);
        }
    }

    //Add final varients to created array of styles
    function addVrients() {
        for (const rule in VarientArr) {
            const vSelectorText = VarientArr[rule].selectorText
            const parent = jsonResult.find(e => e.data.sel == vSelectorText)

            const mediaQueryString = VarientArr[rule].parentRule.conditionText;

            // Use a regular expression to extract the pixel value
            const pixelValueMatch = mediaQueryString.match(/\d+/);

            // Check if a match is found
            let pixel;
            if (pixelValueMatch) {
                const pixelValue = parseInt(pixelValueMatch[0]);
                pixel = pixelValue;
            } else {
                console.log("No pixel value found");
            }

            let jsonItem;

            if (!parent) {
                const id = generateRandomId()
                jsonItem = {
                    style_id: id,
                    data: {
                        comb: "",
                        affects: {},
                        children: [],
                        name: vSelectorText,
                        sel: vSelectorText,
                        styleLess: "",
                        type: "class",
                        variants: {}
                    }
                }
            }


            switch (pixel) {
                case 470:
                    if (!parent) {
                        jsonItem.data.variants["tiny"] = { sel: vSelectorText, styleLess: VarientArr[rule].style.cssText }
                    } else {
                        parent.data.variants["tiny"] = { sel: vSelectorText, styleLess: VarientArr[rule].style.cssText }
                    }
                    break;
                case 767:
                    if (!parent) {
                        jsonItem.data.variants["small"] = { sel: vSelectorText, styleLess: VarientArr[rule].style.cssText }
                    } else {
                        parent.data.variants["small"] = { sel: vSelectorText, styleLess: VarientArr[rule].style.cssText }
                    }
                    break;
                case 991:
                    if (!parent) {
                        jsonItem.data.variants["medium"] = { sel: vSelectorText, styleLess: VarientArr[rule].style.cssText }
                    } else {
                        parent.data.variants["medium"] = { sel: vSelectorText, styleLess: VarientArr[rule].style.cssText }
                    }
                    break;
                case 1280:
                    if (!parent) {
                        jsonItem.data.variants["large"] = { sel: vSelectorText, styleLess: VarientArr[rule].style.cssText }
                    } else {
                        parent.data.variants["large"] = { sel: vSelectorText, styleLess: VarientArr[rule].style.cssText }
                    }
                    break;
                default:
                    break;
            }

            if (jsonItem) {
                jsonResult.push(jsonItem)
            }
        }


    }

    addVrients()
    return jsonResult;
}


// Example usage:
const cssString = `
*, *::before, *::after {
    box-sizing: border-box;
}

html, body {
  font-family: inter;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: 1600px;
  margin: auto;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: "Poppins", sans-serif;
}

img {
  display: block;
}

ul {
  list-style: none;
  padding: 0;
}

a {
  text-decoration: none;
  color: black;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  margin: 0;
}

#main {
    padding: 2em 100em;
}

.nav_bio {
    display: flex;
    flex-direction: column;
    gap: 0px;
}

.product-designer {
    display: flex;
    align-items: center;
    gap: 10px

}

.product-image {
    width: 45px;
    height: 45px;
    padding-top: 5px;
}

.designer {
   color: #98a2b3;
   font-size: 13px;
   margin: 0px;
}

.header {
    display: flex;
    justify-content: space-between;
    gap: 20px; 
    padding-left: 20px;
    padding-right: 20px;
    /* padding-bottom: 1em;  */
}


.header-list {
    display: none;
}

.menu-icon {
    width: 40px;
    height: 50px;
    margin: 10px;
}

.product-head{
    font-size: 1.8em;
    width: 100%;
    line-height: 1.5em;
}

p{
    font-size: 15px;
    line-height: 30px;
    color: #344054;
}

.product_UK-img {
    padding: 0;
    overflow: hidden;
}

.design-image{
    width: 100%;
    height: 100%;   
}

.header_hr {
    margin-top: 0;
}

.horizontal-line{
    width: 90%;
}

.spear-application{
    font-size: 30px;
    padding-left: 20px;
    padding: 1.5em 1.4em 1.5em 0
}

.full-screen{
    width: 90%;
    height: 100%;
    padding-bottom: 40px;
}

.client{
    display: flex;
    gap: 5px;
}

.servicee{
    display: flex;
    justify-content: space-around;
    margin: 0px 20px;
    gap: 1em;
}
.client-service{
    color: #98a2b3;
    font-size: 13px;
}
.client-design{
    font-size: 13px;
}

.live-project{
    background-color: #eaecef; 
    border-radius: 7px;
    font-size: 12px;
    padding: 5px;
    font-size: 14px;
   
}

.project-note{
    display: none;
}

.application{
    display: flex;
    justify-content: space-around;
    gap: 3em;
    margin-top: 25px;
}

.full-screen{
    width: 90%;
    height: 350px;
    margin: 20px 15px 10px ;
}

.note-three{
    font-size: 15px;
    line-height: 30px;
    color: #344054;
    margin: 20px;
}

.note-two{
    font-size: 15px;
    line-height: 30px;
    color: #344054;
    margin: 20px;
}

.concepts{
    font-size: 25px;
    margin-top: 50px;
    padding-left: 20px;
}

.footing{
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
    gap: 10em;
}

.arrow-up{
    width: 28px;
    height: 30px;
    border: 1px solid;
    border-radius: 50px;
    padding: 4px;
}

@media (min-width: 767px) {
    .spear-application{
        font-size: 80px;
    }
    .servicee{
        justify-content: space-around;
        gap: 23em;
    }
    .application{
        justify-content: space-around;
        gap: 400px;
    }

    .full-screen{
        width: 95%;
        height: 120%;
    }

    .concepts{
        margin-left: 20px;
    }
    .footing{
        justify-content: space-around;
        gap: 35em;
    }
}

@media (min-width: 991px) {
    .menu-icon{
        display: none;
    }

    .header{
        display: flex;
        gap: 5em;
        justify-content: space-around;
        padding-right: 30px;
    }

    .ellipse{
        width: 8px;
        height: 8px;
        border-radius: 5px;
        background-color: #039855;
        margin-top: 7px;
    }
    
    .available-freelance{
        display: flex;
        padding:  0px 10px 0px 10px;
        gap: 7px;
        height: 25px;
        margin-left: 50px;
        border-radius: 12px;
        background-color: #f2f4f7;
    }

    .spear-application{
        text-align: center;
    }

    .concept{
        display: flex;
        gap: 50px;
        text-align: justify;
        padding: 10px 20px 30px 50px 
    }

    .servicee{
        justify-content: flex-start;
        gap: 1em;
        margin-left: 50px;
    }

    .project-note{
        display: flex;
    }

    .application{
        gap: 60px;
    }
    .live-project{
        height: 30px;
        padding: 5px;
    }

    .client-service{
        font-size: 14px;
    }

    .note-two{
        display: none;
    }
    .footing{
        gap: 51em;
    }
}

@media (min-width: 1280px) {
    .servicee{
        justify-items: flex-start;
        gap: 0px;
    }
}
`
const result = transformCssToJson(cssString);
console.log(result);



// =============components ========================================



console.log(generateRandId());
// ================ngo ==================================








const temp = {
    "title": "Template-3",
    "description": "This is template three",
    "category": "Template category",
    "amount": "0",
    "thumbnail": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1710339093914-Banner%205.png",
    "assets": {},
    "pages": [
        {
            "route": "/index.html",
            "name": "Home-page",
            "head": {
                "title":"Home",
                "description":" This is the home page for portfolio"
            },
            "slug":"idkk3JXrgA-8z33-EMVA-jB2o",           
            "page_id":"iduqFVh0UK-NBmw-AfbB-KeoW-LleWiezlqEwg",
            "nodes":[
                {
                    "_id": "ido5KXu257-NUhX-onby-5PkF-IwKapv0g7he3",
                    "tag": "main",
                    "classes": [],
                    "data": {},
                    "children": [
                        "id1fDaCNPw-Z24F-TUiv-i0u5-3PfQN3sKXF56",
                        "id68Bw6CGv-W1sH-TLpn-jp1M-py43kCvZZsOO",
                        "idddXhErex-1yIT-JgrZ-yPgL-UuWhJ8ayLBbu",
                        "idcWWdDvsI-kstX-qtBp-yoeG-WH63etJzzBGC",
                        "idcOI9sIQI-GUDP-WAnj-90BK-NgJyZCfrHUgI",
                        "idZABKJIci-tlxb-S449-9Bpu-ydKwFa5QitmX",
                        "idSNBY8sxi-Y2rj-pHeT-F8gv-7WjteMtNt1A3",
                        "idq8HCKNhT-9kIU-xbpl-osRc-XeXD1eUFkvZ6",
                        "idvX5oc2kZ-VUlu-TdQf-Nrhs-VTiKDiDX3p0X",
                        "idwuNNy7nr-UIth-bchM-o2YO-JHl5IlNC0ugQ",
                        "idFwrvEyXf-CRVf-pJqA-XbGw-BeRZBGIZ9SJx",
                        "idPk0NRXMh-N1l2-SC3b-ve94-wClJn8oK3Fo5",
                        "ida3cw0y5g-cZZe-ebEi-sliH-yOX44KWBTfiF"
                    ],
                    "type": "Main"
                },
                {
                    "_id": "idQdtyCuj8-51SC-xWq2-zugJ-G0CAGRgPszVi",
                    "tag": "img",
                    "classes": [
                        "product-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709544146469-Ellipse%20151.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idTQKZuquo-LrkT-6BJ1-WNTM-9h8ZnCZU1B9B",
                    "text": true,
                    "v": "Kiara Jones"
                },
                {
                    "_id": "idEYvd7WRt-sxiH-VQdW-ebxx-S2y8Aa4p9wrT",
                    "tag": "h4",
                    "classes": [
                        "product-name"
                    ],
                    "data": {},
                    "children": [
                        "idTQKZuquo-LrkT-6BJ1-WNTM-9h8ZnCZU1B9B"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idUvJic2DD-ZHQa-4NfF-mDYY-JYuTC9hhh3Sy",
                    "text": true,
                    "v": "Product Designer"
                },
                {
                    "_id": "idUA8jAJnj-FGFx-mrN3-XGNX-ouGCAiUnvHVy",
                    "tag": "h4",
                    "classes": [
                        "designer"
                    ],
                    "data": {},
                    "children": [
                        "idUvJic2DD-ZHQa-4NfF-mDYY-JYuTC9hhh3Sy"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idH49RzVMR-qvV2-3paN-KAfC-Jlfz7i9Qbbef",
                    "tag": "div",
                    "classes": [
                        "nav_bio"
                    ],
                    "data": {},
                    "children": [
                        "idEYvd7WRt-sxiH-VQdW-ebxx-S2y8Aa4p9wrT",
                        "idUA8jAJnj-FGFx-mrN3-XGNX-ouGCAiUnvHVy"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "id51OTdSri-HQdt-ubdK-76xV-yOgbkRjj6dVX",
                    "tag": "div",
                    "classes": [
                        "product-designer"
                    ],
                    "data": {},
                    "children": [
                        "idQdtyCuj8-51SC-xWq2-zugJ-G0CAGRgPszVi",
                        "idH49RzVMR-qvV2-3paN-KAfC-Jlfz7i9Qbbef"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idTB55BWAV-HsMp-HrRj-Uzl9-1IesZIgF92BS",
                    "tag": "div",
                    "classes": [],
                    "data": {},
                    "children": [
                        "id51OTdSri-HQdt-ubdK-76xV-yOgbkRjj6dVX"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idHFvEEcnV-le83-IO6L-Fwr1-CB3KTAiecRER",
                    "text": true,
                    "v": "Work"
                },
                {
                    "_id": "idySChNSSD-diof-m5I0-wgpk-FPx42OftSI4x",
                    "tag": "a",
                    "classes": [
                        "header-icons"
                    ],
                    "data": {
                        "href": "./spear.html"
                    },
                    "children": [
                        "idHFvEEcnV-le83-IO6L-Fwr1-CB3KTAiecRER"
                    ],
                    "type": "Link"
                },
                {
                    "_id": "idhxJ7AhK9-Wm9X-kZSL-giiX-jPJQPjXyVste",
                    "tag": "li",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idySChNSSD-diof-m5I0-wgpk-FPx42OftSI4x"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idBpsh7hk9-u4OB-Lam9-A4V2-B7FFaMnDMETC",
                    "text": true,
                    "v": "About"
                },
                {
                    "_id": "id8ADNmMme-3dsf-wLo4-1MmU-UsedPynqgDGt",
                    "tag": "a",
                    "classes": [
                        "header-icons"
                    ],
                    "data": {
                        "href": "About"
                    },
                    "children": [
                        "idBpsh7hk9-u4OB-Lam9-A4V2-B7FFaMnDMETC"
                    ],
                    "type": "Link"
                },
                {
                    "_id": "idlXRK3crj-78DY-Q1Mt-WBDG-FwxD1YzbcTmN",
                    "tag": "li",
                    "classes": [],
                    "data": {},
                    "children": [
                        "id8ADNmMme-3dsf-wLo4-1MmU-UsedPynqgDGt"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idpBpEzPxm-IATP-NTWM-6NET-pYMn05eATAjO",
                    "text": true,
                    "v": "Contact"
                },
                {
                    "_id": "idhJkNABvp-W36Y-wq4D-U5bK-xMKD2XuxDcii",
                    "tag": "a",
                    "classes": [
                        "header-icons"
                    ],
                    "data": {
                        "href": "Contact"
                    },
                    "children": [
                        "idpBpEzPxm-IATP-NTWM-6NET-pYMn05eATAjO"
                    ],
                    "type": "Link"
                },
                {
                    "_id": "idH934Jfzw-w4ev-65IB-bym6-P88k6I9ZO4KJ",
                    "tag": "li",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idhJkNABvp-W36Y-wq4D-U5bK-xMKD2XuxDcii"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idGha8D6VY-YgOf-nMb9-Ihp7-nWfjTAS4ooec",
                    "tag": "ul",
                    "classes": [
                        "header",
                        "header-list"
                    ],
                    "data": {},
                    "children": [
                        "idhxJ7AhK9-Wm9X-kZSL-giiX-jPJQPjXyVste",
                        "idlXRK3crj-78DY-Q1Mt-WBDG-FwxD1YzbcTmN",
                        "idH934Jfzw-w4ev-65IB-bym6-P88k6I9ZO4KJ"
                    ],
                    "type": "Unordered List"
                },
                {
                    "_id": "idAKpzYION-e9qh-WHcE-hlRb-wHp5QEKI0jrn",
                    "tag": "div",
                    "classes": [
                        "ellipse"
                    ],
                    "data": {},
                    "children": [],
                    "type": "Container"
                },
                {
                    "_id": "idJNklQcUy-0Jj4-JQ30-JI1A-SETsoq0ipvSM",
                    "text": true,
                    "v": "Available for freelance"
                },
                {
                    "_id": "idjodIAVw9-vZn0-Vs8Z-q3LH-cPdWQejiJINF",
                    "tag": "a",
                    "classes": [
                        "freelance"
                    ],
                    "data": {
                        "href": "Available for freelance"
                    },
                    "children": [
                        "idJNklQcUy-0Jj4-JQ30-JI1A-SETsoq0ipvSM"
                    ],
                    "type": "Link"
                },
                {
                    "_id": "id2tVf1bDA-TbCF-9p7s-Zrdg-a5wA0hi4RvU8",
                    "tag": "li",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idjodIAVw9-vZn0-Vs8Z-q3LH-cPdWQejiJINF"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idNTBeJbHV-me65-N1qO-0wVa-mtWCUN1mtjch",
                    "tag": "ul",
                    "classes": [
                        "available-freelance",
                        "header-list"
                    ],
                    "data": {},
                    "children": [
                        "idAKpzYION-e9qh-WHcE-hlRb-wHp5QEKI0jrn",
                        "id2tVf1bDA-TbCF-9p7s-Zrdg-a5wA0hi4RvU8"
                    ]
                },
                {
                    "_id": "idFOMORR2R-Xs2N-o8eI-9nTY-ZDo1cVpCkxtE",
                    "tag": "img",
                    "classes": [
                        "menu-icon"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709418812514-Menu%20Icon.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idfaUeSEMq-IMYk-UUFL-6gkm-P4AlfMiJefqf",
                    "tag": "nav",
                    "classes": [
                        "header"
                    ],
                    "data": {},
                    "children": [
                        "idTB55BWAV-HsMp-HrRj-Uzl9-1IesZIgF92BS",
                        "idGha8D6VY-YgOf-nMb9-Ihp7-nWfjTAS4ooec",
                        "idNTBeJbHV-me65-N1qO-0wVa-mtWCUN1mtjch",
                        "idFOMORR2R-Xs2N-o8eI-9nTY-ZDo1cVpCkxtE"
                    ],
                    "type": "Navigation"
                },
                {
                    "_id": "id1fDaCNPw-Z24F-TUiv-i0u5-3PfQN3sKXF56",
                    "tag": "header",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idfaUeSEMq-IMYk-UUFL-6gkm-P4AlfMiJefqf"
                    ],
                    "type": "Header"
                },
                {
                    "_id": "id68Bw6CGv-W1sH-TLpn-jp1M-py43kCvZZsOO",
                    "tag": "hr",
                    "classes": [
                        "header_hr"
                    ],
                    "data": {},
                    "children": []
                },
                {
                    "_id": "idtyj7GPlV-qkP1-zV80-0O2x-G5WNz8pd4CFT",
                    "text": true,
                    "v": "Product Designer From United Kingdom"
                },
                {
                    "_id": "idmumaLd3r-JkHp-fCs7-ctkr-6FcZtoxhQUDo",
                    "tag": "h1",
                    "classes": [
                        "product-head"
                    ],
                    "data": {},
                    "children": [
                        "idtyj7GPlV-qkP1-zV80-0O2x-G5WNz8pd4CFT"
                    ],
                    "type": "Heading 1"
                },
                {
                    "_id": "idvzX5t7eQ-wVwY-eP82-8mop-zyCSEXa57Ja5",
                    "text": true,
                    "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n            egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n            montes senectus. Lorem ipsum dolor sit amet consectetur. Quam eget\n            in porttitor egestas amet. Cum et feugiat porta pretium. Suscipit et\n            tempus montes senectus."
                },
                {
                    "_id": "idYx2X9X0j-nSlU-sJzA-qhOp-I6AQuuRx1d6o",
                    "tag": "p",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idvzX5t7eQ-wVwY-eP82-8mop-zyCSEXa57Ja5"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idyOKy81Sm-R7OF-DPMK-i9X7-JcxlzsQ3E3wR",
                    "tag": "div",
                    "classes": [
                        "product-note"
                    ],
                    "data": {},
                    "children": [
                        "idmumaLd3r-JkHp-fCs7-ctkr-6FcZtoxhQUDo",
                        "idYx2X9X0j-nSlU-sJzA-qhOp-I6AQuuRx1d6o"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idIVEQMQid-Vkxn-M5FW-tYEc-GRKU1azqtdFU",
                    "tag": "img",
                    "classes": [
                        "design-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709548574354-Frame%201216400724%20%287%29.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "iduH0YQjpT-dSoB-mWzm-5ixh-MGbI4Ubejz0C",
                    "tag": "div",
                    "classes": [
                        "product_UK-img"
                    ],
                    "data": {},
                    "children": [
                        "idIVEQMQid-Vkxn-M5FW-tYEc-GRKU1azqtdFU"
                    ]
                },
                {
                    "_id": "idddXhErex-1yIT-JgrZ-yPgL-UuWhJ8ayLBbu",
                    "tag": "div",
                    "classes": [
                        "product-uk"
                    ],
                    "data": {},
                    "children": [
                        "idyOKy81Sm-R7OF-DPMK-i9X7-JcxlzsQ3E3wR",
                        "iduH0YQjpT-dSoB-mWzm-5ixh-MGbI4Ubejz0C"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idcWWdDvsI-kstX-qtBp-yoeG-WH63etJzzBGC",
                    "tag": "hr",
                    "classes": [],
                    "data": {},
                    "children": []
                },
                {
                    "_id": "idZtLvYSVg-Lxdb-U0k3-wmbV-k4caahm9vPVX",
                    "text": true,
                    "v": "Work"
                },
                {
                    "_id": "idcOI9sIQI-GUDP-WAnj-90BK-NgJyZCfrHUgI",
                    "tag": "h4",
                    "classes": [
                        "works"
                    ],
                    "data": {},
                    "children": [
                        "idZtLvYSVg-Lxdb-U0k3-wmbV-k4caahm9vPVX"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idZEQrTGCZ-znnY-v0n1-6ZqE-W1gw0yVyjgfS",
                    "tag": "img",
                    "classes": [
                        "work-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709553344095-Rectangle%20518%20%281%29.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idz6iMmKYm-sfby-PKUF-hzeB-AwCzTXdDtHdK",
                    "text": true,
                    "v": "Skincare X"
                },
                {
                    "_id": "idyzLGnYon-JtKL-8LHw-Es28-ZzyI3qKTfm6e",
                    "tag": "h4",
                    "classes": [
                        "product-title"
                    ],
                    "data": {},
                    "children": [
                        "idz6iMmKYm-sfby-PKUF-hzeB-AwCzTXdDtHdK"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idjJsGVJVh-A0K5-XdD8-57YL-j6f8txvsnTJH",
                    "text": true,
                    "v": "Web Design"
                },
                {
                    "_id": "idSthkinEV-s3c5-kjQ9-DlSD-F4vEURkzkoUc",
                    "tag": "p",
                    "classes": [
                        "product-role"
                    ],
                    "data": {},
                    "children": [
                        "idjJsGVJVh-A0K5-XdD8-57YL-j6f8txvsnTJH"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idBjX1wWHY-oqVj-2rto-PfTp-yFsA0gHoCHT6",
                    "tag": "div",
                    "classes": [
                        "work"
                    ],
                    "data": {},
                    "children": [
                        "idZEQrTGCZ-znnY-v0n1-6ZqE-W1gw0yVyjgfS",
                        "idyzLGnYon-JtKL-8LHw-Es28-ZzyI3qKTfm6e",
                        "idSthkinEV-s3c5-kjQ9-DlSD-F4vEURkzkoUc"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idEgQOj27i-uW5E-KdLt-mweZ-wzFDojXxZJg9",
                    "tag": "img",
                    "classes": [
                        "work-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709553956271-Rectangle 518 (2).png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idG0CIOcTM-i2WF-oSH7-wzGt-Tc4I7Fql3sCm",
                    "text": true,
                    "v": "Wellness Y"
                },
                {
                    "_id": "idbzSttUYz-rwCQ-h7Zs-kAHa-LqBW0xDX0idY",
                    "tag": "h4",
                    "classes": [
                        "product-title"
                    ],
                    "data": {},
                    "children": [
                        "idG0CIOcTM-i2WF-oSH7-wzGt-Tc4I7Fql3sCm"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "id1cmfhp0x-W9IC-L0zI-nutF-dMqUBXjj9d5Q",
                    "text": true,
                    "v": "UI/UX Design"
                },
                {
                    "_id": "idQcxlT8un-lhIO-McZP-Moha-T4Jx8qLWdKI9",
                    "tag": "p",
                    "classes": [
                        "product-role"
                    ],
                    "data": {},
                    "children": [
                        "id1cmfhp0x-W9IC-L0zI-nutF-dMqUBXjj9d5Q"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idsfxQ3l8x-x6ft-ypzo-UbSp-I34JQ3ZHmDv8",
                    "tag": "div",
                    "classes": [
                        "work"
                    ],
                    "data": {},
                    "children": [
                        "idEgQOj27i-uW5E-KdLt-mweZ-wzFDojXxZJg9",
                        "idbzSttUYz-rwCQ-h7Zs-kAHa-LqBW0xDX0idY",
                        "idQcxlT8un-lhIO-McZP-Moha-T4Jx8qLWdKI9"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idZABKJIci-tlxb-S449-9Bpu-ydKwFa5QitmX",
                    "tag": "div",
                    "classes": [
                        "work-section"
                    ],
                    "data": {},
                    "children": [
                        "idBjX1wWHY-oqVj-2rto-PfTp-yFsA0gHoCHT6",
                        "idsfxQ3l8x-x6ft-ypzo-UbSp-I34JQ3ZHmDv8"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idchFgVsCc-6cdN-DAmj-MYyt-ZICrbHXNgsKd",
                    "tag": "img",
                    "classes": [
                        "work-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709555220258-Rectangle%20518%20%283%29.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idXsvq31gU-Ig4Y-6m90-70ed-oFbqC70VpPGB",
                    "text": true,
                    "v": "Healthcare Z"
                },
                {
                    "_id": "idYnYk1Orv-O8i6-U4Oa-DmFC-btqBMkJIh581",
                    "tag": "h4",
                    "classes": [
                        "product-title"
                    ],
                    "data": {},
                    "children": [
                        "idXsvq31gU-Ig4Y-6m90-70ed-oFbqC70VpPGB"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idbVNrWVAc-hnXi-hhTJ-S7OF-tyTgKdJfQAll",
                    "text": true,
                    "v": "Branding"
                },
                {
                    "_id": "idn4IHUTFV-tUnP-N9jy-SLl2-UE8TOGgCVCfv",
                    "tag": "p",
                    "classes": [
                        "product-role"
                    ],
                    "data": {},
                    "children": [
                        "idbVNrWVAc-hnXi-hhTJ-S7OF-tyTgKdJfQAll"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "id3QCGFlgK-5gF2-1AD4-jzpF-SmpRuvofyHYC",
                    "tag": "div",
                    "classes": [
                        "work"
                    ],
                    "data": {},
                    "children": [
                        "idchFgVsCc-6cdN-DAmj-MYyt-ZICrbHXNgsKd",
                        "idYnYk1Orv-O8i6-U4Oa-DmFC-btqBMkJIh581",
                        "idn4IHUTFV-tUnP-N9jy-SLl2-UE8TOGgCVCfv"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idlRfEgPne-MKHn-tD0N-NEPW-qsmJJxuWSgbl",
                    "tag": "img",
                    "classes": [
                        "work-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709555294312-Rectangle%20518%20%284%29.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "ideVu2ZdTm-snh7-QU0H-t9zL-t9bUiHbhY6Fq",
                    "text": true,
                    "v": "Fleece"
                },
                {
                    "_id": "id38xtCALw-e2uy-CYdd-Ve7m-2jQ2lpYRWQAn",
                    "tag": "h4",
                    "classes": [
                        "product-title"
                    ],
                    "data": {},
                    "children": [
                        "ideVu2ZdTm-snh7-QU0H-t9zL-t9bUiHbhY6Fq"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idhjGwzpTF-rnBq-WaCv-7rjk-vvXhPG2BA5C7",
                    "text": true,
                    "v": "Web Design"
                },
                {
                    "_id": "idDS4CRv7H-kfxP-wY2Q-Q6sG-8H0eiUY6X7ql",
                    "tag": "p",
                    "classes": [
                        "product-role"
                    ],
                    "data": {},
                    "children": [
                        "idhjGwzpTF-rnBq-WaCv-7rjk-vvXhPG2BA5C7"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idESnKVGYD-LuJW-kanW-OcV7-BTn0NcUzmPfd",
                    "tag": "div",
                    "classes": [
                        "work"
                    ],
                    "data": {},
                    "children": [
                        "idlRfEgPne-MKHn-tD0N-NEPW-qsmJJxuWSgbl",
                        "id38xtCALw-e2uy-CYdd-Ve7m-2jQ2lpYRWQAn",
                        "idDS4CRv7H-kfxP-wY2Q-Q6sG-8H0eiUY6X7ql"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idSNBY8sxi-Y2rj-pHeT-F8gv-7WjteMtNt1A3",
                    "tag": "div",
                    "classes": [
                        "work-section"
                    ],
                    "data": {},
                    "children": [
                        "id3QCGFlgK-5gF2-1AD4-jzpF-SmpRuvofyHYC",
                        "idESnKVGYD-LuJW-kanW-OcV7-BTn0NcUzmPfd"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idmc9X6lNB-Qu4P-hbPZ-VZTB-GRObvzBKwSf9",
                    "tag": "img",
                    "classes": [
                        "work-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709556135560-Rectangle%20518%20%285%29.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "ids8lYCd5L-Avfq-c8LT-stuX-rbnVtL5y9wWE",
                    "text": true,
                    "v": "Responsive"
                },
                {
                    "_id": "idfxV1XOmg-v47e-ehPq-WTrM-XpVTdcaap7B1",
                    "tag": "h4",
                    "classes": [
                        "product-title"
                    ],
                    "data": {},
                    "children": [
                        "ids8lYCd5L-Avfq-c8LT-stuX-rbnVtL5y9wWE"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idLHXHNyIO-z83G-hmqJ-bgAw-HSvwLUMq9VR3",
                    "text": true,
                    "v": "Product Design"
                },
                {
                    "_id": "idGbvLuJzm-uNM5-0Anh-dbpI-TZMCLdc5kBET",
                    "tag": "p",
                    "classes": [
                        "product-role"
                    ],
                    "data": {},
                    "children": [
                        "idLHXHNyIO-z83G-hmqJ-bgAw-HSvwLUMq9VR3"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idBULVlX8t-WLxX-KaSI-gNwU-sIyR9TohoW6Y",
                    "tag": "div",
                    "classes": [
                        "work"
                    ],
                    "data": {},
                    "children": [
                        "idmc9X6lNB-Qu4P-hbPZ-VZTB-GRObvzBKwSf9",
                        "idfxV1XOmg-v47e-ehPq-WTrM-XpVTdcaap7B1",
                        "idGbvLuJzm-uNM5-0Anh-dbpI-TZMCLdc5kBET"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "id6RhTRbfJ-wWk2-XAM6-Xwbr-oxGJmG8d18lM",
                    "tag": "img",
                    "classes": [
                        "work-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709556209738-Rectangle 518 (6).png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idp9Jdn2RY-wWK2-NaaG-ycz0-Wr6s4HI6lOkD",
                    "text": true,
                    "v": "Get Fit"
                },
                {
                    "_id": "idlxkMpXJb-VDeW-iD9i-OU1x-MmhDlwbysTom",
                    "tag": "h4",
                    "classes": [
                        "product-title"
                    ],
                    "data": {},
                    "children": [
                        "idp9Jdn2RY-wWK2-NaaG-ycz0-Wr6s4HI6lOkD"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idnj6OlBlA-6cRS-5kBe-oo66-oXMblQaEiXbo",
                    "text": true,
                    "v": "Web Design"
                },
                {
                    "_id": "idUFZbik1k-DlSY-GwJ3-OYM4-3ZrxbDFTGhkc",
                    "tag": "p",
                    "classes": [
                        "product-role"
                    ],
                    "data": {},
                    "children": [
                        "idnj6OlBlA-6cRS-5kBe-oo66-oXMblQaEiXbo"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idTb1A2Ago-03zj-H8FE-GimM-Y7ozBCNMqyAS",
                    "tag": "div",
                    "classes": [
                        "work"
                    ],
                    "data": {},
                    "children": [
                        "id6RhTRbfJ-wWk2-XAM6-Xwbr-oxGJmG8d18lM",
                        "idlxkMpXJb-VDeW-iD9i-OU1x-MmhDlwbysTom",
                        "idUFZbik1k-DlSY-GwJ3-OYM4-3ZrxbDFTGhkc"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idq8HCKNhT-9kIU-xbpl-osRc-XeXD1eUFkvZ6",
                    "tag": "div",
                    "classes": [
                        "work-section"
                    ],
                    "data": {},
                    "children": [
                        "idBULVlX8t-WLxX-KaSI-gNwU-sIyR9TohoW6Y",
                        "idTb1A2Ago-03zj-H8FE-GimM-Y7ozBCNMqyAS"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idtmmA5waD-I1rM-JION-ebej-HzpBUPrwauI0",
                    "text": true,
                    "v": "About"
                },
                {
                    "_id": "idLo5wsUgD-hmjf-j8eJ-pWP8-JiBvzydWxMra",
                    "tag": "h4",
                    "classes": [
                        "about"
                    ],
                    "data": {},
                    "children": [
                        "idtmmA5waD-I1rM-JION-ebej-HzpBUPrwauI0"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "id85krWuJX-AufG-Ucrg-0Z9N-LTi2uKNmjO0w",
                    "tag": "img",
                    "classes": [
                        "about-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709556744613-Frame%201216400724%20%288%29.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "id0xn7iaKh-36gm-WwLl-ZmyD-9rdoYo5IQgiH",
                    "text": true,
                    "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n            egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n            montes senectus. Lorem ipsum dolor sit amet consectetur. Quam eget\n            in porttitor egestas amet. Cum et feugiat porta pretium. Suscipit et\n            tempus montes senectus.Lorem ipsum dolor sit amet consectetur. Quam\n            eget in porttitor egestas amet. Cum et feugiat porta pretium.\n            Suscipit et tempus montes senectus."
                },
                {
                    "_id": "idQqFdhtce-uNhR-rjKp-MAGW-eyOlLYTSEZW8",
                    "tag": "p",
                    "classes": [],
                    "data": {},
                    "children": [
                        "id0xn7iaKh-36gm-WwLl-ZmyD-9rdoYo5IQgiH"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idwbEeRixw-Uzfr-VXc0-6buk-ni67nfUQEj8C",
                    "text": true,
                    "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n            egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n            montes senectus.Lorem ipsum dolor sit amet consectetur. Quam eget in\n            porttitor egestas amet. Cum et feugiat porta pretium."
                },
                {
                    "_id": "idDJcRFS5h-50SC-gRCv-YLYC-ZvqsVSdgLiB4",
                    "tag": "p",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idwbEeRixw-Uzfr-VXc0-6buk-ni67nfUQEj8C"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idukhzV9GU-h2eG-uSIL-Mn1Z-7Wdk3wR5cn6M",
                    "tag": "div",
                    "classes": [
                        "about-section"
                    ],
                    "data": {},
                    "children": [
                        "idLo5wsUgD-hmjf-j8eJ-pWP8-JiBvzydWxMra",
                        "id85krWuJX-AufG-Ucrg-0Z9N-LTi2uKNmjO0w",
                        "idQqFdhtce-uNhR-rjKp-MAGW-eyOlLYTSEZW8",
                        "idDJcRFS5h-50SC-gRCv-YLYC-ZvqsVSdgLiB4"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "id7goYduvq-u9TS-8VwV-6Re1-vgVXRHaQVDAs",
                    "tag": "div",
                    "classes": [
                        "horizontal"
                    ],
                    "data": {},
                    "children": [],
                    "type": "Container"
                },
                {
                    "_id": "id3VYplOWG-UC4p-4KmY-mlVf-R0QYZXsBxYp0",
                    "text": true,
                    "v": "Service"
                },
                {
                    "_id": "idqvJaYhug-4cR7-ucvc-nSIu-kCtcVHHjSj0D",
                    "tag": "h4",
                    "classes": [
                        "service"
                    ],
                    "data": {},
                    "children": [
                        "id3VYplOWG-UC4p-4KmY-mlVf-R0QYZXsBxYp0"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idRz7qbdQB-24OK-4x7I-bDet-ekgkMAv4URTc",
                    "text": true,
                    "v": "Creativity"
                },
                {
                    "_id": "id9a6k0lzC-OmV9-TUFL-IqgH-Dbmo8Vu4k5wK",
                    "tag": "li",
                    "classes": [
                        "service-list"
                    ],
                    "data": {},
                    "children": [
                        "idRz7qbdQB-24OK-4x7I-bDet-ekgkMAv4URTc"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idaHZluVqE-wT5d-8tln-loj9-8GANiXEDeEGL",
                    "text": true,
                    "v": "Branding"
                },
                {
                    "_id": "idhX0N7erN-Prx0-eOte-YIMr-m9V01VjJ0HgS",
                    "tag": "li",
                    "classes": [
                        "service-list"
                    ],
                    "data": {},
                    "children": [
                        "idaHZluVqE-wT5d-8tln-loj9-8GANiXEDeEGL"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idsjaoTAfL-ueMN-x12H-JG3p-pJWFbMgC182K",
                    "tag": "ul",
                    "classes": [
                        "service-service"
                    ],
                    "data": {},
                    "children": [
                        "id9a6k0lzC-OmV9-TUFL-IqgH-Dbmo8Vu4k5wK",
                        "idhX0N7erN-Prx0-eOte-YIMr-m9V01VjJ0HgS"
                    ],
                    "type": "Unordered List"
                },
                {
                    "_id": "idURVbc1G5-JJTP-PcMr-hlPX-VIBox5vCsGYm",
                    "text": true,
                    "v": "Art & Design"
                },
                {
                    "_id": "id2sugithR-MNt4-FIV0-QB1J-cFoSh9uVCjo2",
                    "tag": "li",
                    "classes": [
                        "service-list"
                    ],
                    "data": {},
                    "children": [
                        "idURVbc1G5-JJTP-PcMr-hlPX-VIBox5vCsGYm"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idXd6FqJ81-JQOg-2mYb-ghKG-VCHrHHh8gYs7",
                    "text": true,
                    "v": "Product Design"
                },
                {
                    "_id": "idTAnhT59d-doUQ-kJTb-fkuR-xNkWWPE81wrT",
                    "tag": "li",
                    "classes": [
                        "service-list"
                    ],
                    "data": {},
                    "children": [
                        "idXd6FqJ81-JQOg-2mYb-ghKG-VCHrHHh8gYs7"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idt9bfye6H-G9LX-uZp7-v02n-ALriiPUGvXLy",
                    "tag": "ul",
                    "classes": [
                        "service-service"
                    ],
                    "data": {},
                    "children": [
                        "id2sugithR-MNt4-FIV0-QB1J-cFoSh9uVCjo2",
                        "idTAnhT59d-doUQ-kJTb-fkuR-xNkWWPE81wrT"
                    ],
                    "type": "Unordered List"
                },
                {
                    "_id": "idj9lIOGLq-iS23-8CNr-YTDp-cK0ja5F01DvR",
                    "tag": "div",
                    "classes": [
                        "services"
                    ],
                    "data": {},
                    "children": [
                        "idsjaoTAfL-ueMN-x12H-JG3p-pJWFbMgC182K",
                        "idt9bfye6H-G9LX-uZp7-v02n-ALriiPUGvXLy"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idDY9QqEaL-D3sV-jewX-akid-63ApdqDBetIl",
                    "tag": "hr",
                    "classes": [
                        "header_hr"
                    ],
                    "data": {
                        "data-horizontal": "",
                        "line": ""
                    },
                    "children": []
                },
                {
                    "_id": "idG1RDYMBa-Z35N-I4Cu-eui3-hWCk3TeGknns",
                    "text": true,
                    "v": "Experience"
                },
                {
                    "_id": "idNEGZKsJj-7g4p-IpEj-HelR-Eywb0ZmJBgAA",
                    "tag": "h4",
                    "classes": [
                        "experience"
                    ],
                    "data": {},
                    "children": [
                        "idG1RDYMBa-Z35N-I4Cu-eui3-hWCk3TeGknns"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idFmgPfuTc-rlqd-zYHE-2R9S-fBXhTwounrFj",
                    "text": true,
                    "v": "Design lead"
                },
                {
                    "_id": "idS7QPpgGG-fvdb-zFNZ-W2wl-tRFhUWA5xIhI",
                    "tag": "h5",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idFmgPfuTc-rlqd-zYHE-2R9S-fBXhTwounrFj"
                    ],
                    "type": "Paragrpah"
                },
                {
                    "_id": "idhwpelqqc-Co0T-1oFf-ejwK-IcC2YIaZubtb",
                    "tag": "div",
                    "classes": [
                        "lineheight"
                    ],
                    "data": {},
                    "children": [],
                    "type": "Container"
                },
                {
                    "_id": "id7bso9ROd-N5kz-D5Zt-bWwN-xFsrpZ1YjjjF",
                    "text": true,
                    "v": "New Balance"
                },
                {
                    "_id": "idKrHtuzYy-rXka-ST48-yGI5-ENpeexA8B6Sz",
                    "tag": "h5",
                    "classes": [],
                    "data": {},
                    "children": [
                        "id7bso9ROd-N5kz-D5Zt-bWwN-xFsrpZ1YjjjF"
                    ],
                    "type": "Paragrpah"
                },
                {
                    "_id": "idofLOmB0V-DCaD-qPa0-Y0Pi-vcdQrMa5gtgM",
                    "tag": "div",
                    "classes": [
                        "linestyle"
                    ],
                    "data": {},
                    "children": [
                        "idS7QPpgGG-fvdb-zFNZ-W2wl-tRFhUWA5xIhI",
                        "idhwpelqqc-Co0T-1oFf-ejwK-IcC2YIaZubtb",
                        "idKrHtuzYy-rXka-ST48-yGI5-ENpeexA8B6Sz"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idfLzofblz-sDXo-qoqt-WBVs-s7rJQLro2g2u",
                    "text": true,
                    "v": "2023-Now"
                },
                {
                    "_id": "idUuRJzSLL-Eeuy-4AsU-0Bm5-uRncAdtOHaJ2",
                    "tag": "p",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idfLzofblz-sDXo-qoqt-WBVs-s7rJQLro2g2u"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idR2joRe0V-lvqL-lvf2-AqeE-AMrV0tYdHDeg",
                    "tag": "div",
                    "classes": [
                        "experience-date"
                    ],
                    "data": {},
                    "children": [
                        "idUuRJzSLL-Eeuy-4AsU-0Bm5-uRncAdtOHaJ2"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idfx3Enbit-hcNB-K9Aq-E2p0-A26VxyHC3b38",
                    "tag": "div",
                    "classes": [
                        "experience-list"
                    ],
                    "data": {},
                    "children": [
                        "idofLOmB0V-DCaD-qPa0-Y0Pi-vcdQrMa5gtgM",
                        "idR2joRe0V-lvqL-lvf2-AqeE-AMrV0tYdHDeg"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "id2UX19Q2d-4fCN-vzB6-pXYS-qIvQKs45BOPX",
                    "text": true,
                    "v": "Associate Designer"
                },
                {
                    "_id": "idamts6EiX-Nv2f-IReX-eUW2-kOWktost69xd",
                    "tag": "h5",
                    "classes": [],
                    "data": {},
                    "children": [
                        "id2UX19Q2d-4fCN-vzB6-pXYS-qIvQKs45BOPX"
                    ],
                    "type": "Paragrpah"
                },
                {
                    "_id": "idwwGIKkgE-Fpvu-IYvK-ZyFl-q37KvTg0Mxfs",
                    "tag": "div",
                    "classes": [
                        "lineheight"
                    ],
                    "data": {},
                    "children": [],
                    "type": "Container"
                },
                {
                    "_id": "idCMpy5Ybo-eiKI-hZ0G-VFHK-9vt2nnTwVtyw",
                    "text": true,
                    "v": "Nike"
                },
                {
                    "_id": "idUaZSgTNk-6ELc-j5TW-K1Hs-f3VF2lnaxw5s",
                    "tag": "h5",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idCMpy5Ybo-eiKI-hZ0G-VFHK-9vt2nnTwVtyw"
                    ],
                    "type": "Paragrpah"
                },
                {
                    "_id": "idsqL7RgOf-UfXp-EuHG-KllV-XAlHaUMlwKfH",
                    "tag": "div",
                    "classes": [
                        "linestyle"
                    ],
                    "data": {},
                    "children": [
                        "idamts6EiX-Nv2f-IReX-eUW2-kOWktost69xd",
                        "idwwGIKkgE-Fpvu-IYvK-ZyFl-q37KvTg0Mxfs",
                        "idUaZSgTNk-6ELc-j5TW-K1Hs-f3VF2lnaxw5s"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idJiJjsvvh-5MRE-0csk-kBnZ-g1iCNkomlymo",
                    "text": true,
                    "v": "2023-Now"
                },
                {
                    "_id": "idbWTWrdaq-XaVV-0g65-6G0j-pkGPLwjLzL1y",
                    "tag": "p",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idJiJjsvvh-5MRE-0csk-kBnZ-g1iCNkomlymo"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idCiDRpWkj-G8yF-ONGD-BNa3-OcE1RB41hqmi",
                    "tag": "div",
                    "classes": [
                        "experience-date"
                    ],
                    "data": {},
                    "children": [
                        "idbWTWrdaq-XaVV-0g65-6G0j-pkGPLwjLzL1y"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idcsJl3G4f-N5GQ-L5AF-PsAk-A2ovIjzziy7G",
                    "tag": "div",
                    "classes": [
                        "experience-list"
                    ],
                    "data": {},
                    "children": [
                        "idsqL7RgOf-UfXp-EuHG-KllV-XAlHaUMlwKfH",
                        "idCiDRpWkj-G8yF-ONGD-BNa3-OcE1RB41hqmi"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idtIHgST4v-J56V-o9HC-3VMo-NYsZ9HGh8dU1",
                    "text": true,
                    "v": "Associate Designer"
                },
                {
                    "_id": "idGhrlG794-C1Ni-rH8g-mJ3v-cRCkVU7E7FNz",
                    "tag": "h5",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idtIHgST4v-J56V-o9HC-3VMo-NYsZ9HGh8dU1"
                    ],
                    "type": "Paragrpah"
                },
                {
                    "_id": "idWq56V3QH-Y7To-N95w-nAiJ-7PLKtlk1M7F0",
                    "tag": "div",
                    "classes": [
                        "lineheight"
                    ],
                    "data": {},
                    "children": [],
                    "type": "Container"
                },
                {
                    "_id": "idFJn4hphu-fNRx-ye0M-giGp-RXAx9vFwMaTg",
                    "text": true,
                    "v": "Nike"
                },
                {
                    "_id": "idditmdSnW-2wQh-ANpL-IPHG-iQH81l81kqEi",
                    "tag": "h5",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idFJn4hphu-fNRx-ye0M-giGp-RXAx9vFwMaTg"
                    ],
                    "type": "Paragrpah"
                },
                {
                    "_id": "id0xHzxMov-pBkh-u6Lc-Pd4l-Fa48gBuehFOW",
                    "tag": "div",
                    "classes": [
                        "linestyle"
                    ],
                    "data": {},
                    "children": [
                        "idGhrlG794-C1Ni-rH8g-mJ3v-cRCkVU7E7FNz",
                        "idWq56V3QH-Y7To-N95w-nAiJ-7PLKtlk1M7F0",
                        "idditmdSnW-2wQh-ANpL-IPHG-iQH81l81kqEi"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idqOkjWtFi-UEb2-mXgv-wfgI-DSWZEOx3on1W",
                    "text": true,
                    "v": "2023-Now"
                },
                {
                    "_id": "id3UtX1B6p-pb2W-nA6E-XhR2-gmNOtXcGlrEi",
                    "tag": "p",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idqOkjWtFi-UEb2-mXgv-wfgI-DSWZEOx3on1W"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "id8iGYt3Fe-CFeJ-efc8-JCG5-5fZ1XMO7Comg",
                    "tag": "div",
                    "classes": [
                        "experience-date"
                    ],
                    "data": {},
                    "children": [
                        "id3UtX1B6p-pb2W-nA6E-XhR2-gmNOtXcGlrEi"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "id5q6nTjn8-7wNK-tQaD-eddX-ZIdJnngqU98I",
                    "tag": "div",
                    "classes": [
                        "experience-list"
                    ],
                    "data": {},
                    "children": [
                        "id0xHzxMov-pBkh-u6Lc-Pd4l-Fa48gBuehFOW",
                        "id8iGYt3Fe-CFeJ-efc8-JCG5-5fZ1XMO7Comg"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idiOaVBf3H-tYFO-RswI-Icr2-cGkYdlf9q6nG",
                    "text": true,
                    "v": "Associate Designer"
                },
                {
                    "_id": "id6CsOpy0E-fKVr-xFDB-yBg1-nplT3lMY6U0V",
                    "tag": "h5",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idiOaVBf3H-tYFO-RswI-Icr2-cGkYdlf9q6nG"
                    ],
                    "type": "Paragrpah"
                },
                {
                    "_id": "idIHlqUMmf-rX3j-7k1o-RvLe-55ODqHyogg3P",
                    "tag": "div",
                    "classes": [
                        "lineheight"
                    ],
                    "data": {},
                    "children": [],
                    "type": "Container"
                },
                {
                    "_id": "id3LQXOnkx-Vus6-VnTJ-mvZD-5w6IllcB8Oba",
                    "text": true,
                    "v": "Nike"
                },
                {
                    "_id": "id1zqTCUyD-TI9m-C9YN-SPUH-MbfbF0Aycc3o",
                    "tag": "h5",
                    "classes": [],
                    "data": {},
                    "children": [
                        "id3LQXOnkx-Vus6-VnTJ-mvZD-5w6IllcB8Oba"
                    ],
                    "type": "Paragrpah"
                },
                {
                    "_id": "id7h2frbd2-EzLM-oILS-3uL8-HjEJPIQuY0kc",
                    "tag": "div",
                    "classes": [
                        "linestyle"
                    ],
                    "data": {},
                    "children": [
                        "id6CsOpy0E-fKVr-xFDB-yBg1-nplT3lMY6U0V",
                        "idIHlqUMmf-rX3j-7k1o-RvLe-55ODqHyogg3P",
                        "id1zqTCUyD-TI9m-C9YN-SPUH-MbfbF0Aycc3o"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "iduyRa2gXj-oszS-TP5o-613T-lVA5JqeP7Rqz",
                    "text": true,
                    "v": "2023-Now"
                },
                {
                    "_id": "idTkxdynIV-R3t2-K6y6-IxSi-IyTMEwb8wqRx",
                    "tag": "p",
                    "classes": [],
                    "data": {},
                    "children": [
                        "iduyRa2gXj-oszS-TP5o-613T-lVA5JqeP7Rqz"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idbu6Klhcj-JI74-1qSH-XMRy-cyZFIfUAznlb",
                    "tag": "div",
                    "classes": [
                        "experience-date"
                    ],
                    "data": {},
                    "children": [
                        "idTkxdynIV-R3t2-K6y6-IxSi-IyTMEwb8wqRx"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idxfMalrJj-pBbI-ECG5-u2Mu-zJypBUQq1D82",
                    "tag": "div",
                    "classes": [
                        "experience-list"
                    ],
                    "data": {},
                    "children": [
                        "id7h2frbd2-EzLM-oILS-3uL8-HjEJPIQuY0kc",
                        "idbu6Klhcj-JI74-1qSH-XMRy-cyZFIfUAznlb"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idVrSxdnIW-1jPy-9HOR-51qH-LZOiUZYqcmdJ",
                    "text": true,
                    "v": "Associate Designer"
                },
                {
                    "_id": "idvBBcXAIG-IuAz-QqCI-DtLG-mAguksq0ep0T",
                    "tag": "h5",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idVrSxdnIW-1jPy-9HOR-51qH-LZOiUZYqcmdJ"
                    ],
                    "type": "Paragrpah"
                },
                {
                    "_id": "idmuEQvk9w-XBMl-wlYE-A6dq-byPgV84l7Yq5",
                    "tag": "div",
                    "classes": [
                        "lineheight"
                    ],
                    "data": {},
                    "children": [],
                    "type": "Container"
                },
                {
                    "_id": "ideoUxshzN-1mod-YTUf-EpGS-KlJseLN2GE9f",
                    "text": true,
                    "v": "Nike"
                },
                {
                    "_id": "id9azPrAY4-qDN5-53D3-ZdKl-wU4RnFiipjUm",
                    "tag": "h5",
                    "classes": [],
                    "data": {},
                    "children": [
                        "ideoUxshzN-1mod-YTUf-EpGS-KlJseLN2GE9f"
                    ],
                    "type": "Paragrpah"
                },
                {
                    "_id": "idjG9dn8Mx-Sifx-ZP8J-x9Nz-7P2cxyTCUjjU",
                    "tag": "div",
                    "classes": [
                        "linestyle"
                    ],
                    "data": {},
                    "children": [
                        "idvBBcXAIG-IuAz-QqCI-DtLG-mAguksq0ep0T",
                        "idmuEQvk9w-XBMl-wlYE-A6dq-byPgV84l7Yq5",
                        "id9azPrAY4-qDN5-53D3-ZdKl-wU4RnFiipjUm"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idgpkIELrt-JVgP-iKZ5-VF7l-9yPdf9QpBNqO",
                    "text": true,
                    "v": "2023-Now"
                },
                {
                    "_id": "idOOyWmQmu-oMCP-3qxb-RGxq-UAViahfo6fem",
                    "tag": "p",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idgpkIELrt-JVgP-iKZ5-VF7l-9yPdf9QpBNqO"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idnVINILd6-UBTS-9juu-HAKf-0Xc5B2Xy0YOl",
                    "tag": "div",
                    "classes": [
                        "experience-date"
                    ],
                    "data": {},
                    "children": [
                        "idOOyWmQmu-oMCP-3qxb-RGxq-UAViahfo6fem"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idREz1vo7w-80Q2-SLu0-QMN0-nM7fAUYDjRGO",
                    "tag": "div",
                    "classes": [
                        "experience-list"
                    ],
                    "data": {},
                    "children": [
                        "idjG9dn8Mx-Sifx-ZP8J-x9Nz-7P2cxyTCUjjU",
                        "idnVINILd6-UBTS-9juu-HAKf-0Xc5B2Xy0YOl"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "ide3pPLkRF-YApd-uETl-8iXp-36cIcfRa1uKh",
                    "tag": "div",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idfx3Enbit-hcNB-K9Aq-E2p0-A26VxyHC3b38",
                        "idcsJl3G4f-N5GQ-L5AF-PsAk-A2ovIjzziy7G",
                        "id5q6nTjn8-7wNK-tQaD-eddX-ZIdJnngqU98I",
                        "idxfMalrJj-pBbI-ECG5-u2Mu-zJypBUQq1D82",
                        "idREz1vo7w-80Q2-SLu0-QMN0-nM7fAUYDjRGO"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idIEAehjRA-XxBL-jf6K-SbXd-IKldYZBkc1od",
                    "tag": "div",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idqvJaYhug-4cR7-ucvc-nSIu-kCtcVHHjSj0D",
                        "idj9lIOGLq-iS23-8CNr-YTDp-cK0ja5F01DvR",
                        "idDY9QqEaL-D3sV-jewX-akid-63ApdqDBetIl",
                        "idNEGZKsJj-7g4p-IpEj-HelR-Eywb0ZmJBgAA",
                        "ide3pPLkRF-YApd-uETl-8iXp-36cIcfRa1uKh"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idvX5oc2kZ-VUlu-TdQf-Nrhs-VTiKDiDX3p0X",
                    "tag": "div",
                    "classes": [
                        "about-service"
                    ],
                    "data": {},
                    "children": [
                        "idukhzV9GU-h2eG-uSIL-Mn1Z-7Wdk3wR5cn6M",
                        "id7goYduvq-u9TS-8VwV-6Re1-vgVXRHaQVDAs",
                        "idIEAehjRA-XxBL-jf6K-SbXd-IKldYZBkc1od"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idyCSjgJqJ-zpGQ-Z09I-ClDe-x7XmGnGBoEE4",
                    "text": true,
                    "v": "LET'S CONNECT"
                },
                {
                    "_id": "idwuNNy7nr-UIth-bchM-o2YO-JHl5IlNC0ugQ",
                    "tag": "h1",
                    "classes": [
                        "connect"
                    ],
                    "data": {},
                    "children": [
                        "idyCSjgJqJ-zpGQ-Z09I-ClDe-x7XmGnGBoEE4"
                    ],
                    "type": "Heading 1"
                },
                {
                    "_id": "idLe7UbCnO-JTMS-ruS4-9iBK-0kHe1N9sgT0r",
                    "text": true,
                    "v": "LinkedIn"
                },
                {
                    "_id": "idWDwbgiYJ-ptkW-WgQH-ayko-a7ok8n0yrbFh",
                    "tag": "p",
                    "classes": [
                        "social-list"
                    ],
                    "data": {},
                    "children": [
                        "idLe7UbCnO-JTMS-ruS4-9iBK-0kHe1N9sgT0r"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idmRU9D8sd-JbAX-Jnrz-YmCO-9otQgQO9UYiC",
                    "tag": "img",
                    "classes": [
                        "arrow-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idWMaZI0yl-w5SM-FqyE-Pnjc-nLZ4rYfE0Lnn",
                    "tag": "li",
                    "classes": [
                        "arrow"
                    ],
                    "data": {},
                    "children": [
                        "idWDwbgiYJ-ptkW-WgQH-ayko-a7ok8n0yrbFh",
                        "idmRU9D8sd-JbAX-Jnrz-YmCO-9otQgQO9UYiC"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idOqNUCrh6-Srvg-lSDn-LJgh-B6W30f9leMFu",
                    "text": true,
                    "v": "Dribble"
                },
                {
                    "_id": "iddyM9NThj-yYov-B0tF-cYBV-Mum9KX8RtjjI",
                    "tag": "p",
                    "classes": [
                        "social-list"
                    ],
                    "data": {},
                    "children": [
                        "idOqNUCrh6-Srvg-lSDn-LJgh-B6W30f9leMFu"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idg7hrY9ka-56N3-76Ak-r9H4-M3YRFiD0ys8T",
                    "tag": "img",
                    "classes": [
                        "arrow-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idswp7mTak-Gh96-lJmq-EDOj-aHKsJlB1u8LP",
                    "tag": "li",
                    "classes": [
                        "arrow"
                    ],
                    "data": {},
                    "children": [
                        "iddyM9NThj-yYov-B0tF-cYBV-Mum9KX8RtjjI",
                        "idg7hrY9ka-56N3-76Ak-r9H4-M3YRFiD0ys8T"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "id4wlTG2vI-RUHc-q259-thEu-p0rPFBDGjgUa",
                    "tag": "ul",
                    "classes": [
                        "socials"
                    ],
                    "data": {},
                    "children": [
                        "idWMaZI0yl-w5SM-FqyE-Pnjc-nLZ4rYfE0Lnn",
                        "idswp7mTak-Gh96-lJmq-EDOj-aHKsJlB1u8LP"
                    ],
                    "type": "Unordered List"
                },
                {
                    "_id": "idXNjwbDty-k1Z5-eFrv-pGNA-ddgO3hdtD24f",
                    "text": true,
                    "v": "Instagram"
                },
                {
                    "_id": "idKcWrOWbT-XmXl-6HDu-byRG-4Vh0Lk25qm6H",
                    "tag": "p",
                    "classes": [
                        "social-list"
                    ],
                    "data": {},
                    "children": [
                        "idXNjwbDty-k1Z5-eFrv-pGNA-ddgO3hdtD24f"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idmUTmaQyn-Fd8b-UhIu-CTf2-k2V5tg7oa2bZ",
                    "tag": "img",
                    "classes": [
                        "arrow-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idR7Eh3X0a-bzy2-PRHU-K6iD-522Mjbyvn4WZ",
                    "tag": "li",
                    "classes": [
                        "arrow"
                    ],
                    "data": {},
                    "children": [
                        "idKcWrOWbT-XmXl-6HDu-byRG-4Vh0Lk25qm6H",
                        "idmUTmaQyn-Fd8b-UhIu-CTf2-k2V5tg7oa2bZ"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idgp5kxqFr-a2RK-CHMR-QsYx-jdUkV9l7Pp6P",
                    "text": true,
                    "v": "Twitter"
                },
                {
                    "_id": "id9XvaAMie-OBc7-Xzss-TkQN-DGGf4x5rBzav",
                    "tag": "p",
                    "classes": [
                        "social-list"
                    ],
                    "data": {},
                    "children": [
                        "idgp5kxqFr-a2RK-CHMR-QsYx-jdUkV9l7Pp6P"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idJRKXkKud-MsvH-ZgXK-OkKw-Zem8ol4q5Cqq",
                    "tag": "img",
                    "classes": [
                        "arrow-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idFr9JFasr-FVoo-nvC0-WrEY-HlahhyGLC3OC",
                    "tag": "li",
                    "classes": [
                        "arrow"
                    ],
                    "data": {},
                    "children": [
                        "id9XvaAMie-OBc7-Xzss-TkQN-DGGf4x5rBzav",
                        "idJRKXkKud-MsvH-ZgXK-OkKw-Zem8ol4q5Cqq"
                    ],
                    "type": "List Item"
                },
                {
                    "_id": "idM0Xd0SN9-oZN4-efXa-Tm4j-gXZGBs3mNEGE",
                    "tag": "ul",
                    "classes": [
                        "socials"
                    ],
                    "data": {},
                    "children": [
                        "idR7Eh3X0a-bzy2-PRHU-K6iD-522Mjbyvn4WZ",
                        "idFr9JFasr-FVoo-nvC0-WrEY-HlahhyGLC3OC"
                    ],
                    "type": "Unordered List"
                },
                {
                    "_id": "idFwrvEyXf-CRVf-pJqA-XbGw-BeRZBGIZ9SJx",
                    "tag": "div",
                    "classes": [
                        "social"
                    ],
                    "data": {},
                    "children": [
                        "id4wlTG2vI-RUHc-q259-thEu-p0rPFBDGjgUa",
                        "idM0Xd0SN9-oZN4-efXa-Tm4j-gXZGBs3mNEGE"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idPk0NRXMh-N1l2-SC3b-ve94-wClJn8oK3Fo5",
                    "tag": "hr",
                    "classes": [],
                    "data": {},
                    "children": []
                },
                {
                    "_id": "id6ph2esrx-cNpL-Ibfu-X0jM-O8KRs6VPEhgq",
                    "text": true,
                    "v": "© 2024 Kiara Jones"
                },
                {
                    "_id": "ida3cw0y5g-cZZe-ebEi-sliH-yOX44KWBTfiF",
                    "tag": "p",
                    "classes": [
                        "footer"
                    ],
                    "data": {},
                    "children": [
                        "id6ph2esrx-cNpL-Ibfu-X0jM-O8KRs6VPEhgq"
                    ],
                    "type": "Paragraph"
                }
            ],
            "styles":{
                "data": {
                    "appliedStylesMap": {},
                    "breakpoints": {
                    }, 
                    "macros": [], "migrations": {"stylesNext": true}, "swatches": []
                },
                "style":[
                    {
                        "style_id": "a3ef9797-d311-476e-889a-24603baf60ea",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "*, ::before, ::after",
                            "sel": "*, ::before, ::after",
                            "styleLess": "box-sizing: border-box;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "bca187ff-1d16-408c-a56d-d44c25170965",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "html, body",
                            "sel": "html, body",
                            "styleLess": "font-family: inter; height: 100%; padding: 0px; max-width: 1600px; margin: auto;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "77629298-0a80-40b9-aedf-6f2a51f8dfac",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "body",
                            "sel": "body",
                            "styleLess": "line-height: 1.5; -webkit-font-smoothing: antialiased; font-family: Poppins, sans-serif;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "3f07eb64-a033-4917-9115-7999c7cf7167",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "img",
                            "sel": "img",
                            "styleLess": "display: block;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "723b0618-6954-4009-8482-e7f43f998640",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "ul",
                            "sel": "ul",
                            "styleLess": "list-style: none; padding: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "926e2c7d-7b9a-4fa3-b69d-c91d73180ef5",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "a",
                            "sel": "a",
                            "styleLess": "text-decoration: none; color: black;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "9f44673a-8c50-41c3-bb08-7c9da605db8e",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "p, h1, h2, h3, h4, h5, h6",
                            "sel": "p, h1, h2, h3, h4, h5, h6",
                            "styleLess": "overflow-wrap: break-word; margin: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "24a55142-f0a0-4f59-a27c-036e7afc6401",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "#main",
                            "sel": "#main",
                            "styleLess": "padding: 2em 1em;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "c05a24a4-63b0-4581-9f7d-dbc7749d20c1",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".nav_bio",
                            "styleLess": "display: flex; flex-direction: column; gap: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "8b76c595-94d7-40f8-ae7c-0a195c89a52a",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product-designer",
                            "styleLess": "display: flex; align-items: center; gap: 10px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "f128aaa8-2f8c-4432-bb01-df2c7d745126",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product-image",
                            "styleLess": "width: 45px; height: 45px; padding-top: 5px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "e2879e7b-ad9f-4aa2-b6d5-8c3690898c06",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".designer",
                            "styleLess": "color: rgb(152, 162, 179); font-size: 13px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "851d44c9-bfdb-484c-882b-366bc80d8a4a",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".header",
                            "styleLess": "display: flex; justify-content: space-between; gap: 20px; padding-bottom: 1em;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".header",
                                    "styleLess": "display: flex; gap: 40px; padding-right: 30px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "1ba6a980-e1ef-40a4-9452-5a2aa8e65f02",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".header-list",
                            "styleLess": "display: none;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "a3a690f6-e57e-4722-bc25-7be742b95b8d",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".menu-icon",
                            "styleLess": "width: 40px; height: 40px;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".menu-icon",
                                    "styleLess": "display: none;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "cf600a66-bf56-4f67-b004-47501e8e0224",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product-head",
                            "styleLess": "font-size: 1.8em; width: 90%; line-height: 1.5em;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".product-head",
                                    "styleLess": "font-size: 36px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "e7772f31-e21c-439a-8db4-bd4174fd60ad",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "p",
                            "sel": "p",
                            "styleLess": "font-size: 15px; line-height: 30px; color: rgb(52, 64, 84);",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "89d49b0e-47de-4d45-bca7-9afd53c0cc6a",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product_UK-img",
                            "styleLess": "width: 95%; height: 500px; padding: 0px; overflow: hidden;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "0a4a8762-a630-495d-a3cc-0472d387ddeb",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".design-image",
                            "styleLess": "width: 100%; height: 100%; object-fit: cover; object-position: center center;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".design-image",
                                    "styleLess": "width: 100%; height: 100%; padding-bottom: 40px;"
                                },
                                "medium": {
                                    "sel": ".design-image",
                                    "styleLess": "width: 100%; height: 100%;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "79917271-45da-44bb-878e-0bddb628ba34",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".header_hr",
                            "styleLess": "margin-top: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "ad6185a3-b0a5-482c-891e-88c07609ec12",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "hr",
                            "sel": "hr",
                            "styleLess": "margin: 2em 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "fba43476-eefd-43ed-9cc1-5c0025ef9c7a",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".work-image",
                            "styleLess": "width: 100%; height: 150%;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".work-image",
                                    "styleLess": "width: 90%; height: 110%;"
                                },
                                "medium": {
                                    "sel": ".work-image",
                                    "styleLess": "width: 100%; height: 100%;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "2d2c29cf-2104-4f00-9623-eca7e34275cf",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product-title",
                            "styleLess": "margin: 0px; font-size: 20px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "6ddf1745-833e-46e9-87f3-5a146ef2052a",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".work",
                            "styleLess": "padding-bottom: 40px;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".work",
                                    "styleLess": "padding-left: 20px;"
                                },
                                "medium": {
                                    "sel": ".work",
                                    "styleLess": "margin-bottom: 30px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "ffbadff1-72bf-4707-99f6-4ca19fb07dc2",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product-role",
                            "styleLess": "margin: 3px 0px; font-size: 13px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "92aeb19d-ad34-4ae2-a109-1b3072b82c79",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".about-image",
                            "styleLess": "width: 100%;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".about-image",
                                    "styleLess": "width: 650px; height: 650px;"
                                },
                                "medium": {
                                    "sel": ".about-image",
                                    "styleLess": "width: 450px; height: 350px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "21d70915-711a-464c-bc87-566e25825146",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".services",
                            "styleLess": "display: flex; gap: 60px;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".services",
                                    "styleLess": "gap: 0px; margin-left: 10px; flex-direction: column; margin-bottom: 0px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "faf60e03-97eb-43de-a509-c9bcbe760823",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".service-list",
                            "styleLess": "font-size: 13px; margin: 12px;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".service-list",
                                    "styleLess": "margin-left: 0px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "05ed014a-30da-4128-b4e9-1d5c0a82f8df",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".works",
                            "styleLess": "padding: 3px 10px; background-color: rgb(254, 228, 226); margin-top: 40px; margin-bottom: 20px; font-weight: 400; font-size: 13px; border-radius: 40px; width: 60px; text-align: center;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".works",
                                    "styleLess": "margin-left: 50px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "9617d0da-e35b-45cc-a910-b9b7666edabd",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".about",
                            "styleLess": "padding: 4px 10px; background-color: rgb(234, 236, 245); margin-top: 40px; font-weight: 400; margin-bottom: 10px; font-size: 13px; border-radius: 40px; width: 60px; text-align: center;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".about",
                                    "styleLess": "width: 12%; margin-top: 8px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "a7b40498-1c1c-4943-91e1-356aec048fc5",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".break",
                            "styleLess": "word-break: break-word;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "7eee56f8-b0f4-4e04-a4f5-a92b659d3ce1",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".service",
                            "styleLess": "padding: 4px 11px; background-color: rgb(254, 240, 199); font-weight: 400; margin-top: 20px; font-size: 13px; border-radius: 40px; width: 70px; text-align: center;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".service",
                                    "styleLess": "margin-left: 0px; width: 33%;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "33d9d92f-d2ad-430f-9f3c-612521a0fa68",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".experience",
                            "styleLess": "padding: 4px 11px; font-weight: 400; margin-bottom: 20px; font-size: 13px; border-radius: 40px; background-color: rgb(209, 250, 223); width: 95px; text-align: center;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".experience",
                                    "styleLess": "margin-left: 0px; width: 45%;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "be3d167d-e8fe-48eb-892c-71f95d137ffc",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".lineheight",
                            "styleLess": "width: 20px; height: 1.5px; margin-top: 10px; background-color: rgb(152, 162, 179);",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "948eaa22-c5c3-45c9-a24a-173563c9407b",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".linestyle",
                            "styleLess": "display: flex; gap: 5px; padding: 0px; margin: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "fb4d6ec4-9182-41d1-ba9b-3b603b72c174",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".about-section",
                            "styleLess": "display: flex; flex-direction: column; gap: 1.5em;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".about-section",
                                    "styleLess": "width: 500px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "10c2bc80-5208-4c1f-a533-dbf59e1e3bed",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".experience-date",
                            "styleLess": "margin-top: 1em; width: 90px; height: 35px; font-size: 12px; border: 1px solid rgb(0, 0, 0); border-radius: 40px; text-align: center;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "fa17640f-396d-4080-9094-0174561fe954",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".vertical",
                            "styleLess": "display: none; height: 1px; width: 340px; background-color: rgb(152, 162, 179); padding-right: 50px; margin-bottom: 40px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "02315d29-d423-479b-9069-625a08a1504d",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".experience-list",
                            "styleLess": "margin: 0px 0px 20px;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".experience-list",
                                    "styleLess": "margin-bottom: 50px; margin-left: 15px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "d5a26303-10df-48f0-96c7-6d48f2c568d0",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".connect",
                            "styleLess": "font-size: 45px; font-weight: 400; padding: 30px 0px;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".connect",
                                    "styleLess": "font-size: 87px;"
                                },
                                "medium": {
                                    "sel": ".connect",
                                    "styleLess": "font-size: 140px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "690be443-3254-428d-9931-233ced5fa2bc",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product-note",
                            "styleLess": "display: flex; flex-direction: column; gap: 1.2em; margin-bottom: 1.2em;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".product-note",
                                    "styleLess": "width: 70%; justify-content: center; margin-top: 7em;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "bafb7513-be3e-4f21-ba2b-729cf561a33c",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".arrow",
                            "styleLess": "display: flex; justify-content: space-around; align-items: center; font-weight: 600; font-size: 15px; gap: 10px; border: 1px solid; width: 150px; height: 40px; border-radius: 40px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "17259aa7-e9a2-4a8f-9422-d8d736163d84",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".arrow-image",
                            "styleLess": "width: 20px; height: 20px; margin-top: 6px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "261fc9af-f1f2-4d96-8209-45662b7e9648",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".social-list",
                            "styleLess": "margin-top: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "12a6039b-dbc5-4cb8-95e2-5f77652efc4c",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".socials",
                            "styleLess": "display: flex; justify-content: center; gap: 40px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "4ea23d59-47ce-4634-b228-4dd4014b1f40",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".social",
                            "styleLess": "background-color: rgb(255, 247, 245); margin: 0px 0px 30px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "8e669159-7e75-403d-99cd-57891ed482d9",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".footer",
                            "styleLess": "text-align: center;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".footer",
                                    "styleLess": "text-align: left;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "94426584-602d-4e30-9cbb-0774b52019c7",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "html body",
                            "sel": "html body",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": "html body",
                                    "styleLess": "margin-left: 30px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "48118a7b-a685-4dad-9a28-848bba5cff5d",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": ".ellipse",
                            "sel": ".ellipse",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".ellipse",
                                    "styleLess": "width: 8px; height: 8px; border-radius: 5px; background-color: rgb(3, 152, 85); margin-top: 7px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "cbe1440d-a3e1-47ef-a159-ea9f08bdc59c",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": ".available-freelance",
                            "sel": ".available-freelance",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".available-freelance",
                                    "styleLess": "display: flex; padding: 0px 10px; gap: 7px; height: 25px; border-radius: 12px; background-color: rgb(242, 244, 247);"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "2c2f644a-3e58-4993-b9e3-c5aa88360930",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": ".product-uk",
                            "sel": ".product-uk",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".product-uk",
                                    "styleLess": "display: flex; width: 100%; gap: 50px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "9ee02f79-3b6b-4ae1-a6b1-066a0aba2ce3",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": ".work-section",
                            "sel": ".work-section",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".work-section",
                                    "styleLess": "display: flex; gap: 10px; margin-bottom: 40px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "6cbb82fd-c3d9-494d-9800-cc702dda845c",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": ".about-service",
                            "sel": ".about-service",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".about-service",
                                    "styleLess": "display: flex; padding-left: 50px; gap: 26px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "62c3ba17-1563-44cc-b124-ec7b3c943c50",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": ".horizontal",
                            "sel": ".horizontal",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".horizontal",
                                    "styleLess": "margin-left: 0px; width: 1px; height: 730px; background-color: rgb(152, 162, 179);"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "56f3e512-2d2b-4576-8632-03c593133e33",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": ".service-service",
                            "sel": ".service-service",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".service-service",
                                    "styleLess": "margin: 0px;"
                                }
                            }
                        }
                    }
                ]
            }
        },
        {
            "route": "/spear.html",
            "name": "work page",
            "head": {
                "title": "About",
                "description": "This is the work page for porfolio-3"
            },
            "slug": "idbNci57if-mdNK-9cCn",
            "page_id": "idbNci57if-mdNK-9cCn-qfBm-E5kdXE5TkBNw",
            "nodes": [
                {
                    "_id": "id6OMmWllJ-UaN1-SsKN-o8IA-abUAXH57gkSf",
                    "tag": "main",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idizJeueo2-fHdn-Yopp-TwKP-Ok0Xh8FFgkHk",
                        "id9hCvkOxx-42RM-2FHj-L2q6-mdyveGP8g9BK",
                        "idqudEZKau-lM3S-XDDN-WevE-Pvocj40PKGZl",
                        "idJMWY4Z2k-gBWA-GZlc-dYmE-r0VCU1fYOBLT",
                        "idkRSCkRp6-DeKO-oxUV-8xrz-C0pUlziZSh7L",
                        "idgtGxpYTa-gglY-0HbK-MPCZ-YGvuxDnh6B5o",
                        "id03snPpwK-UiBP-1sXA-0KVe-R116s4LVbqgP",
                        "idEE5ZE3OV-K3Wd-ahGG-L600-Z5e2Xk7VPpaQ",
                        "idWtYBSNRG-KdM6-N7WP-8w7p-yhmwS8ZzZFo3",
                        "idobwnXAsI-OdTc-fxEx-rPOA-UVxOcBnBY2z8",
                        "id8kCpwYjS-YLnE-tSJB-7hym-9GH5EA9RWNjL"
                    ],
                    "type": "Main"
                },
                {
                    "_id": "idX5b2dCxB-4McG-LN4e-2ozK-CtXI1HRXq8dF",
                    "tag": "img",
                    "classes": [
                        "product-image"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709544146469-Ellipse%20151.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idH0To3wPA-yjZd-KxQJ-xVxP-5zBNzFB8T2Q0",
                    "tag": "div",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idX5b2dCxB-4McG-LN4e-2ozK-CtXI1HRXq8dF"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idycbMOst1-RzEe-2y4D-pnZq-YmJ9aD7yXaHU",
                    "text": true,
                    "v": "Kiara Jones"
                },
                {
                    "_id": "idCYyK9uqi-bQuq-uOKT-WMPL-eEv6qdnEtRjg",
                    "tag": "h4",
                    "classes": [
                        "product-name"
                    ],
                    "data": {},
                    "children": [
                        "idycbMOst1-RzEe-2y4D-pnZq-YmJ9aD7yXaHU"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idndGQjVE5-MnRP-3bOi-VHwK-yZwiUUia8xkH",
                    "text": true,
                    "v": "Product Designer"
                },
                {
                    "_id": "idUsjV2IpT-kIti-tb07-OIbj-UGDFSrhR77sb",
                    "tag": "h4",
                    "classes": [
                        "designer"
                    ],
                    "data": {},
                    "children": [
                        "idndGQjVE5-MnRP-3bOi-VHwK-yZwiUUia8xkH"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "id7ChrYIzm-XwTi-O6gV-sTVe-ajrNDsS2vwP9",
                    "tag": "div",
                    "classes": [
                        "nav_bio"
                    ],
                    "data": {},
                    "children": [
                        "idCYyK9uqi-bQuq-uOKT-WMPL-eEv6qdnEtRjg",
                        "idUsjV2IpT-kIti-tb07-OIbj-UGDFSrhR77sb"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "id7VCdvbpp-Z88w-aa0C-xXul-hr9zI2pAFXYW",
                    "tag": "li",
                    "classes": [
                        "product-designer"
                    ],
                    "data": {},
                    "children": [
                        "idH0To3wPA-yjZd-KxQJ-xVxP-5zBNzFB8T2Q0",
                        "id7ChrYIzm-XwTi-O6gV-sTVe-ajrNDsS2vwP9"
                    ],
                    "type": "Link"
                },
                {
                    "_id": "idRpI82waO-7MxG-XoAW-TOvS-2AwTPJd5Opkn",
                    "tag": "ul",
                    "classes": [],
                    "data": {},
                    "children": [
                        "id7VCdvbpp-Z88w-aa0C-xXul-hr9zI2pAFXYW"
                    ],
                    "type": "Unordered List"
                },
                {
                    "_id": "idvil82ZxL-eo4S-MXbW-0l1z-FjRHMkiXR93a",
                    "text": true,
                    "v": "Work"
                },
                {
                    "_id": "idCnX86BZb-DSLG-EcdW-o8Kh-bMgSlSqtgqCm",
                    "tag": "a",
                    "classes": [
                        "header-icons"
                    ],
                    "data": {
                        "href": "#work"
                    },
                    "children": [
                        "idvil82ZxL-eo4S-MXbW-0l1z-FjRHMkiXR93a"
                    ]
                },
                {
                    "_id": "idmUsQ5tD3-EOyh-BiOF-1wqp-SiXSUJR9HxBH",
                    "tag": "li",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idCnX86BZb-DSLG-EcdW-o8Kh-bMgSlSqtgqCm"
                    ],
                    "type": "Link"
                },
                {
                    "_id": "idkUTJoKf2-qud3-XSlA-cuQt-CtfzuzvKhk2m",
                    "text": true,
                    "v": "About"
                },
                {
                    "_id": "id3wGIyjiV-CaEo-O3zX-7zn2-wnsUu0k6XU4E",
                    "tag": "a",
                    "classes": [
                        "header-icons"
                    ],
                    "data": {
                        "href": "./index.html"
                    },
                    "children": [
                        "idkUTJoKf2-qud3-XSlA-cuQt-CtfzuzvKhk2m"
                    ]
                },
                {
                    "_id": "idBTiTM9Hn-b18Z-wWih-j6bz-ewJEq2DdqGrj",
                    "tag": "li",
                    "classes": [],
                    "data": {},
                    "children": [
                        "id3wGIyjiV-CaEo-O3zX-7zn2-wnsUu0k6XU4E"
                    ],
                    "type": "Link"
                },
                {
                    "_id": "idTfmgiDWM-KEUX-Y85q-0u68-4qVwX0kDfhI6",
                    "text": true,
                    "v": "Contact"
                },
                {
                    "_id": "idmDX4SjHy-lV4n-y3Fo-tiWj-0skZZ3GM8KC2",
                    "tag": "a",
                    "classes": [
                        "header-icons"
                    ],
                    "data": {
                        "href": "Contact"
                    },
                    "children": [
                        "idTfmgiDWM-KEUX-Y85q-0u68-4qVwX0kDfhI6"
                    ]
                },
                {
                    "_id": "idfcCQlH1y-oK3b-sSQ6-Ql3j-ovOBIOH0o1qN",
                    "tag": "li",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idmDX4SjHy-lV4n-y3Fo-tiWj-0skZZ3GM8KC2"
                    ],
                    "type": "Link"
                },
                {
                    "_id": "idLTVXBNLy-f1DZ-M0is-rotV-Alx14hcXCiY8",
                    "tag": "ul",
                    "classes": [
                        "header",
                        "header-list"
                    ],
                    "data": {},
                    "children": [
                        "idmUsQ5tD3-EOyh-BiOF-1wqp-SiXSUJR9HxBH",
                        "idBTiTM9Hn-b18Z-wWih-j6bz-ewJEq2DdqGrj",
                        "idfcCQlH1y-oK3b-sSQ6-Ql3j-ovOBIOH0o1qN"
                    ],
                    "type": "Unordered List"
                },
                {
                    "_id": "idP4mnsLaX-KFS3-QcT7-xyT2-pNjQn4ifa2wY",
                    "tag": "div",
                    "classes": [
                        "ellipse"
                    ],
                    "data": {},
                    "children": [],
                    "type": "Container"
                },
                {
                    "_id": "idoJCGaWgv-geNh-2Fsg-FBAx-Q713tv20EXEl",
                    "text": true,
                    "v": "Available for freelance"
                },
                {
                    "_id": "idZcXkoxFs-2yTd-Tthx-JOl2-cjK4mQicdrsd",
                    "tag": "a",
                    "classes": [
                        "freelance"
                    ],
                    "data": {
                        "href": "Available for freelance"
                    },
                    "children": [
                        "idoJCGaWgv-geNh-2Fsg-FBAx-Q713tv20EXEl"
                    ]
                },
                {
                    "_id": "idaIdlvcGF-KGY6-kB5J-K2nQ-EhyQqyT7XF1x",
                    "tag": "li",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idZcXkoxFs-2yTd-Tthx-JOl2-cjK4mQicdrsd"
                    ],
                    "type": "Link"
                },
                {
                    "_id": "id0TNKheR1-w7vw-U0WS-Vv2D-48lsyHK8whO1",
                    "tag": "ul",
                    "classes": [
                        "available-freelance",
                        "header-list"
                    ],
                    "data": {},
                    "children": [
                        "idP4mnsLaX-KFS3-QcT7-xyT2-pNjQn4ifa2wY",
                        "idaIdlvcGF-KGY6-kB5J-K2nQ-EhyQqyT7XF1x"
                    ],
                    "type": "Unordered List"
                },
                {
                    "_id": "idthuOZ7HT-VWwt-qVaQ-oVsj-3V1DnTbGXSgv",
                    "tag": "img",
                    "classes": [
                        "menu-icon"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709418812514-Menu%20Icon.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idSkHXkZNy-0cRX-6O4f-AbPl-jpXwtkvam95K",
                    "tag": "div",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idthuOZ7HT-VWwt-qVaQ-oVsj-3V1DnTbGXSgv"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idLFz1MnR4-mBqZ-uOEx-z2fU-0u965R5XKmMk",
                    "tag": "nav",
                    "classes": [
                        "header"
                    ],
                    "data": {},
                    "children": [
                        "idRpI82waO-7MxG-XoAW-TOvS-2AwTPJd5Opkn",
                        "idLTVXBNLy-f1DZ-M0is-rotV-Alx14hcXCiY8",
                        "id0TNKheR1-w7vw-U0WS-Vv2D-48lsyHK8whO1",
                        "idSkHXkZNy-0cRX-6O4f-AbPl-jpXwtkvam95K"
                    ]
                },
                {
                    "_id": "idWbY7xF5q-U1R0-yXVQ-go5v-Rjc6ZrT5kn6n",
                    "tag": "header",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idLFz1MnR4-mBqZ-uOEx-z2fU-0u965R5XKmMk"
                    ],
                    "type": "Heading"
                },
                {
                    "_id": "idBH2nqk3N-KAxh-13Dp-RZdS-pOveJGcryobq",
                    "tag": "hr",
                    "classes": [
                        "header_hr"
                    ],
                    "data": {},
                    "children": [],
                    "type": "Horizontal Line"
                },
                {
                    "_id": "idizJeueo2-fHdn-Yopp-TwKP-Ok0Xh8FFgkHk",
                    "tag": "div",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idWbY7xF5q-U1R0-yXVQ-go5v-Rjc6ZrT5kn6n",
                        "idBH2nqk3N-KAxh-13Dp-RZdS-pOveJGcryobq"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idA6KQmafO-U7MP-ROTz-DQdS-LNNcN7iOcEOX",
                    "text": true,
                    "v": "Spear Application"
                },
                {
                    "_id": "id9hCvkOxx-42RM-2FHj-L2q6-mdyveGP8g9BK",
                    "tag": "h1",
                    "classes": [
                        "spear-application"
                    ],
                    "data": {},
                    "children": [
                        "idA6KQmafO-U7MP-ROTz-DQdS-LNNcN7iOcEOX"
                    ],
                    "type": "Heading 1"
                },
                {
                    "_id": "idqudEZKau-lM3S-XDDN-WevE-Pvocj40PKGZl",
                    "tag": "hr",
                    "classes": [
                        "horizontal-line"
                    ],
                    "data": {},
                    "children": [],
                    "type": "Horizontal Line"
                },
                {
                    "_id": "idr3LypUCY-NfHZ-Ekcc-pZqV-ayVS04aQzB2E",
                    "text": true,
                    "v": "Client:"
                },
                {
                    "_id": "idAKrWSlvu-YwKe-9Bwc-ZGLT-5LaXJrfKsSSd",
                    "tag": "p",
                    "classes": [
                        "client-service"
                    ],
                    "data": {},
                    "children": [
                        "idr3LypUCY-NfHZ-Ekcc-pZqV-ayVS04aQzB2E"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idvrsmLOiZ-hfjd-simJ-EIJe-HgVt1NgbEu32",
                    "text": true,
                    "v": "Ten Studios"
                },
                {
                    "_id": "idmkzFdRcT-9Qr7-R7LZ-hYeB-fpzWHLRkpH1U",
                    "tag": "b",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idvrsmLOiZ-hfjd-simJ-EIJe-HgVt1NgbEu32"
                    ]
                },
                {
                    "_id": "idmqmy0asp-6PFn-Ofp0-VqPj-RcsgKsx3e61e",
                    "tag": "p",
                    "classes": [
                        "client-design"
                    ],
                    "data": {},
                    "children": [
                        "idmkzFdRcT-9Qr7-R7LZ-hYeB-fpzWHLRkpH1U"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "id7gkYmZi0-XYRj-jYS4-mXEJ-nDNQifU7AuGk",
                    "tag": "div",
                    "classes": [
                        "client"
                    ],
                    "data": {},
                    "children": [
                        "idAKrWSlvu-YwKe-9Bwc-ZGLT-5LaXJrfKsSSd",
                        "idmqmy0asp-6PFn-Ofp0-VqPj-RcsgKsx3e61e"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idv7OS36qI-MlSy-y7sk-cblH-X5LO4kH8SB3t",
                    "text": true,
                    "v": "Service:"
                },
                {
                    "_id": "idHdKt0Olg-fvs9-qYdL-h2pg-3xP7j4RYmCXR",
                    "tag": "p",
                    "classes": [
                        "client-service"
                    ],
                    "data": {},
                    "children": [
                        "idv7OS36qI-MlSy-y7sk-cblH-X5LO4kH8SB3t"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "id7DFVqqJk-lbB5-E5zs-w5CY-s7H6aS4FCzrU",
                    "text": true,
                    "v": "UI/UX Design"
                },
                {
                    "_id": "idweNMrzD2-JhNe-R3ej-OBSd-52awmHixuZEP",
                    "tag": "b",
                    "classes": [],
                    "data": {},
                    "children": [
                        "id7DFVqqJk-lbB5-E5zs-w5CY-s7H6aS4FCzrU"
                    ]
                },
                {
                    "_id": "iduZQH7jAl-1NfO-dZKc-Ec6e-k1rhu3LaVi0C",
                    "tag": "p",
                    "classes": [
                        "client-design"
                    ],
                    "data": {},
                    "children": [
                        "idweNMrzD2-JhNe-R3ej-OBSd-52awmHixuZEP"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idcx9jED6F-zgRk-t5WV-wt6X-fbB6YRkzBW8Z",
                    "tag": "div",
                    "classes": [
                        "client"
                    ],
                    "data": {},
                    "children": [
                        "idHdKt0Olg-fvs9-qYdL-h2pg-3xP7j4RYmCXR",
                        "iduZQH7jAl-1NfO-dZKc-Ec6e-k1rhu3LaVi0C"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idJMWY4Z2k-gBWA-GZlc-dYmE-r0VCU1fYOBLT",
                    "tag": "div",
                    "classes": [
                        "servicee"
                    ],
                    "data": {},
                    "children": [
                        "id7gkYmZi0-XYRj-jYS4-mXEJ-nDNQifU7AuGk",
                        "idcx9jED6F-zgRk-t5WV-wt6X-fbB6YRkzBW8Z"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idNhQQq6x7-E7G7-ZSRP-drAF-ioO9rwEMAilx",
                    "text": true,
                    "v": "(2023)"
                },
                {
                    "_id": "id6q0HcTjP-QWtE-bDmV-9eLT-bEFuNPujh64n",
                    "tag": "h4",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idNhQQq6x7-E7G7-ZSRP-drAF-ioO9rwEMAilx"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "ido841JCRt-g7DH-WmO8-e9eB-GBC1vObOcCc5",
                    "text": true,
                    "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in"
                },
                {
                    "_id": "idt3u8jgxb-wGQ5-3c1o-eWGf-PnG9KagPvZ3S",
                    "tag": "br",
                    "classes": [],
                    "data": {},
                    "children": []
                },
                {
                    "_id": "id38K9IKkK-xaWu-njRz-E66D-VOlz6VAKqVnb",
                    "text": true,
                    "v": "porttitor\n          egestas amet. Cum et feugiat porta pretium."
                },
                {
                    "_id": "idlOLmI1uC-yrGV-JEQd-6jsB-CbYs5nZOWtAd",
                    "tag": "br",
                    "classes": [],
                    "data": {},
                    "children": []
                },
                {
                    "_id": "idWkbwtaqb-npN3-04bd-D6zf-rJxXUGvEjwkg",
                    "text": true,
                    "v": "Suscipit et tempus\n          montes senectus."
                },
                {
                    "_id": "id031zSH2l-wGq9-L7ZR-5jTN-JM3WR49SLsbx",
                    "tag": "p",
                    "classes": [
                        "project-note"
                    ],
                    "data": {},
                    "children": [
                        "ido841JCRt-g7DH-WmO8-e9eB-GBC1vObOcCc5",
                        "idt3u8jgxb-wGQ5-3c1o-eWGf-PnG9KagPvZ3S",
                        "id38K9IKkK-xaWu-njRz-E66D-VOlz6VAKqVnb",
                        "idlOLmI1uC-yrGV-JEQd-6jsB-CbYs5nZOWtAd",
                        "idWkbwtaqb-npN3-04bd-D6zf-rJxXUGvEjwkg"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idynRr5irE-jsYR-9Vrt-aO4I-NTNaUGudnLNU",
                    "text": true,
                    "v": "Visit Live Project"
                },
                {
                    "_id": "idHWQnafUs-PKTH-Us7O-W4ho-CUvO5qAEFpnY",
                    "tag": "h4",
                    "classes": [
                        "live-project"
                    ],
                    "data": {},
                    "children": [
                        "idynRr5irE-jsYR-9Vrt-aO4I-NTNaUGudnLNU"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idkRSCkRp6-DeKO-oxUV-8xrz-C0pUlziZSh7L",
                    "tag": "div",
                    "classes": [
                        "application"
                    ],
                    "data": {},
                    "children": [
                        "id6q0HcTjP-QWtE-bDmV-9eLT-bEFuNPujh64n",
                        "id031zSH2l-wGq9-L7ZR-5jTN-JM3WR49SLsbx",
                        "idHWQnafUs-PKTH-Us7O-W4ho-CUvO5qAEFpnY"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idxR5hocyB-uJlt-FmDp-KS16-0JeT4tDjxMCw",
                    "text": true,
                    "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor egestas\n        amet. Cum et feugiat porta pretium. Suscipit et tempus montes senectus."
                },
                {
                    "_id": "idgtGxpYTa-gglY-0HbK-MPCZ-YGvuxDnh6B5o",
                    "tag": "p",
                    "classes": [
                        "note-two"
                    ],
                    "data": {},
                    "children": [
                        "idxR5hocyB-uJlt-FmDp-KS16-0JeT4tDjxMCw"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idPw5w2crh-LA5w-vQJv-yCS8-Rddrl5p2Sppb",
                    "tag": "img",
                    "classes": [
                        "full-screen"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709806964231-Rectangle%20532.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "id03snPpwK-UiBP-1sXA-0KVe-R116s4LVbqgP",
                    "tag": "div",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idPw5w2crh-LA5w-vQJv-yCS8-Rddrl5p2Sppb"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idIGoOlFg3-w3SB-w1d3-uZXn-kYt89ceAiYcC",
                    "text": true,
                    "v": "Concept"
                },
                {
                    "_id": "idy3cnyqsF-Ba6c-5en7-MdMt-sftak6nzH1zF",
                    "tag": "h3",
                    "classes": [
                        "concepts"
                    ],
                    "data": {},
                    "children": [
                        "idIGoOlFg3-w3SB-w1d3-uZXn-kYt89ceAiYcC"
                    ],
                    "type": "Heading 3"
                },
                {
                    "_id": "idEVEyIByV-cIfi-5tSL-vThL-IlwuISYtO06d",
                    "text": true,
                    "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor egestas\n          amet. Cum et feugiat porta pretium. Suscipit et tempus montes\n          senectus. Lorem ipsum dolor sit amet consectetur. Quam eget in\n          porttitor egestas amet. Cum et feugiat porta pretium. Suscipit et\n          tempus montes senectus. Lorem ipsum dolor sit amet consectetur. Quam\n          eget in porttitor egestas amet."
                },
                {
                    "_id": "id5ozAKPYO-bKib-tkXp-Msfq-WiVl0sGMb4Ds",
                    "tag": "p",
                    "classes": [
                        "note-three"
                    ],
                    "data": {},
                    "children": [
                        "idEVEyIByV-cIfi-5tSL-vThL-IlwuISYtO06d"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idEE5ZE3OV-K3Wd-ahGG-L600-Z5e2Xk7VPpaQ",
                    "tag": "div",
                    "classes": [
                        "concept"
                    ],
                    "data": {},
                    "children": [
                        "idy3cnyqsF-Ba6c-5en7-MdMt-sftak6nzH1zF",
                        "id5ozAKPYO-bKib-tkXp-Msfq-WiVl0sGMb4Ds"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idGm5eDBp2-Or7F-dlCH-ptDl-Ok0uWjsIrppZ",
                    "tag": "img",
                    "classes": [
                        "full-screen"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709807993676-Rectangle%20533.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idPn6pJB3f-KMHz-PVnM-OUJV-dM5mfXokyPZn",
                    "tag": "img",
                    "classes": [
                        "full-screen"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709808051635-Rectangle%20534.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idRUNhM2NY-tcm1-bXEF-ezGu-YNcUQXb2zk0c",
                    "tag": "img",
                    "classes": [
                        "full-screen"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709808111201-Rectangle%20535.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "idWtYBSNRG-KdM6-N7WP-8w7p-yhmwS8ZzZFo3",
                    "tag": "div",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idGm5eDBp2-Or7F-dlCH-ptDl-Ok0uWjsIrppZ",
                        "idPn6pJB3f-KMHz-PVnM-OUJV-dM5mfXokyPZn",
                        "idRUNhM2NY-tcm1-bXEF-ezGu-YNcUQXb2zk0c"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "idobwnXAsI-OdTc-fxEx-rPOA-UVxOcBnBY2z8",
                    "tag": "hr",
                    "classes": [],
                    "data": {},
                    "children": [],
                    "type": "Horizontal Line"
                },
                {
                    "_id": "idgZMWH2KQ-ZxiK-Y3hf-ONRT-ByxuiI5ecEmg",
                    "tag": "img",
                    "classes": [
                        "arrow-up"
                    ],
                    "data": {
                        "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1710324623153-Vector.png"
                    },
                    "children": [],
                    "type": "Image"
                },
                {
                    "_id": "ida0jPtwEb-T2sF-xMlQ-PG55-FteghWCgZhLi",
                    "tag": "div",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idgZMWH2KQ-ZxiK-Y3hf-ONRT-ByxuiI5ecEmg"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "ids390c1VV-lA8O-EPQf-RI4m-CRJiVFm68dx9",
                    "text": true,
                    "v": "Skincare X"
                },
                {
                    "_id": "idvoILQXq8-NIkF-arJ3-YAjQ-gVEB6uThk0QN",
                    "tag": "h4",
                    "classes": [
                        "skincare"
                    ],
                    "data": {},
                    "children": [
                        "ids390c1VV-lA8O-EPQf-RI4m-CRJiVFm68dx9"
                    ],
                    "type": "Heading 4"
                },
                {
                    "_id": "idc3JX9tSM-Svu3-83BP-tWSK-3wwJFWTUDjjI",
                    "text": true,
                    "v": "Next Project"
                },
                {
                    "_id": "idQbx2EXb2-RKyW-sa6w-UKqU-5AMHO8QKya2d",
                    "tag": "p",
                    "classes": [
                        "next-project"
                    ],
                    "data": {},
                    "children": [
                        "idc3JX9tSM-Svu3-83BP-tWSK-3wwJFWTUDjjI"
                    ],
                    "type": "Paragraph"
                },
                {
                    "_id": "idIzdM2duM-EePu-fA82-TeYu-iHKqJtvlEdES",
                    "tag": "div",
                    "classes": [],
                    "data": {},
                    "children": [
                        "idvoILQXq8-NIkF-arJ3-YAjQ-gVEB6uThk0QN",
                        "idQbx2EXb2-RKyW-sa6w-UKqU-5AMHO8QKya2d"
                    ],
                    "type": "Container"
                },
                {
                    "_id": "id8kCpwYjS-YLnE-tSJB-7hym-9GH5EA9RWNjL",
                    "tag": "footer",
                    "classes": [
                        "footing"
                    ],
                    "data": {},
                    "children": [
                        "ida0jPtwEb-T2sF-xMlQ-PG55-FteghWCgZhLi",
                        "idIzdM2duM-EePu-fA82-TeYu-iHKqJtvlEdES"
                    ],
                    "type": "Footer"
                }
            ],
            "styles": {
                "data": {
                    "appliedStylesMap": {},
                    "breakpoints": {
                    },
                    "macros": [], "migrations": { "stylesNext": true }, "swatches": []
                },
                "style": [
                    {
                        "style_id": "40ce0780-471b-48cb-badf-1fc955ffa234",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "*, ::before, ::after",
                            "sel": "*, ::before, ::after",
                            "styleLess": "box-sizing: border-box;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "99ab7796-f55a-43e0-a15c-877634f3c965",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "html, body",
                            "sel": "html, body",
                            "styleLess": "font-family: inter; height: 100%; width: 100%; padding: 0px; max-width: 1600px; margin: auto;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "c03a8ac3-4efe-4291-9517-58ea69621a90",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "body",
                            "sel": "body",
                            "styleLess": "line-height: 1.5; -webkit-font-smoothing: antialiased; font-family: Poppins, sans-serif;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "722cfdba-4992-4030-a11e-80c184142dfb",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "img",
                            "sel": "img",
                            "styleLess": "display: block;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "e1566e8f-8b66-4614-9e42-f77bed8c41a2",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "ul",
                            "sel": "ul",
                            "styleLess": "list-style: none; padding: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "28c780cb-cbb3-493c-a20e-fb3387c035cd",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "a",
                            "sel": "a",
                            "styleLess": "text-decoration: none; color: black;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "451cf1be-a434-457e-86f6-5bc6ebbd92b2",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "p, h1, h2, h3, h4, h5, h6",
                            "sel": "p, h1, h2, h3, h4, h5, h6",
                            "styleLess": "overflow-wrap: break-word; margin: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "53dcbda9-e3d3-4a0b-a868-15dbc90f0678",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "#main",
                            "sel": "#main",
                            "styleLess": "padding: 2em 100em;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "d86fa27b-4f02-46b3-8100-2075cff90afe",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".nav_bio",
                            "styleLess": "display: flex; flex-direction: column; gap: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "ccc1baff-a0e9-48b6-bd7a-94cf691ba66f",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product-designer",
                            "styleLess": "display: flex; align-items: center; gap: 10px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "6c2e8292-8f7d-44dd-828e-80456ce0b51c",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product-image",
                            "styleLess": "width: 45px; height: 45px; padding-top: 5px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "e52726a7-ec56-468e-9a94-bfc5dfa27d6e",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".designer",
                            "styleLess": "color: rgb(152, 162, 179); font-size: 13px; margin: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "5ecc904e-30c0-49e9-b621-41baf7375d7b",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".header",
                            "styleLess": "display: flex; justify-content: space-between; gap: 20px; padding-left: 20px; padding-right: 20px;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".header",
                                    "styleLess": "display: flex; gap: 5em; justify-content: space-around; padding-right: 30px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "7027fd6e-2ad8-4f2d-9495-30156df9c817",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".header-list",
                            "styleLess": "display: none;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "6b8946b9-2f19-4af4-94bf-a727c275568a",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".menu-icon",
                            "styleLess": "width: 40px; height: 50px; margin: 10px;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".menu-icon",
                                    "styleLess": "display: none;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "6b0bef1b-5530-4ec2-b99d-1f9ba46300b6",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product-head",
                            "styleLess": "font-size: 1.8em; width: 100%; line-height: 1.5em;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "d99261ec-ef6e-4364-a33f-26829fba8a1e",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "p",
                            "sel": "p",
                            "styleLess": "font-size: 15px; line-height: 30px; color: rgb(52, 64, 84);",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "48f0e95e-59c7-44ef-bbd1-f0e30f084c92",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".product_UK-img",
                            "styleLess": "padding: 0px; overflow: hidden;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "29af90c8-b361-4d33-87b1-2427010dd61a",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".design-image",
                            "styleLess": "width: 100%; height: 100%;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "d079126d-916d-4e53-a5be-ba87130355f0",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".header_hr",
                            "styleLess": "margin-top: 0px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "8d12f3b7-e3a1-4bd1-9f87-bde98493e6de",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".horizontal-line",
                            "styleLess": "width: 90%;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "fe06e709-e85f-49d2-80cc-9f7fce671556",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".spear-application",
                            "styleLess": "font-size: 30px; padding: 1.5em 1.4em 1.5em 0px;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".spear-application",
                                    "styleLess": "font-size: 80px;"
                                },
                                "medium": {
                                    "sel": ".spear-application",
                                    "styleLess": "text-align: center;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "e6df1963-a521-411e-a046-74758a8c8cda",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".full-screen",
                            "styleLess": "width: 90%; height: 100%; padding-bottom: 40px;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".full-screen",
                                    "styleLess": "width: 95%; height: 120%;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "df7f2e24-4c9c-4b0b-b2ad-9d1cca452bef",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".client",
                            "styleLess": "display: flex; gap: 5px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "981b124a-68bb-4ff1-8ea8-c02df26c6b41",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".servicee",
                            "styleLess": "display: flex; justify-content: space-around; margin: 0px 20px; gap: 1em;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".servicee",
                                    "styleLess": "justify-content: space-around; gap: 23em;"
                                },
                                "medium": {
                                    "sel": ".servicee",
                                    "styleLess": "justify-content: flex-start; gap: 1em; margin-left: 50px;"
                                },
                                "large": {
                                    "sel": ".servicee",
                                    "styleLess": "justify-items: flex-start; gap: 0px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "f6140f81-22ca-4198-9171-5bc6a6a69cfd",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".client-service",
                            "styleLess": "color: rgb(152, 162, 179); font-size: 13px;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".client-service",
                                    "styleLess": "font-size: 14px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "7c371d7b-d031-4ebc-a7a7-1369f36ccb74",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".client-design",
                            "styleLess": "font-size: 13px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "6b34b26b-5ef4-43ef-8cb1-61f02be0c466",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".live-project",
                            "styleLess": "background-color: rgb(234, 236, 239); border-radius: 7px; padding: 5px; font-size: 14px;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".live-project",
                                    "styleLess": "height: 30px; padding: 5px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "8422de74-baa5-4442-8547-bc3f860cf843",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".project-note",
                            "styleLess": "display: none;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".project-note",
                                    "styleLess": "display: flex;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "2607d515-7313-412a-bc59-bdd53d896658",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".application",
                            "styleLess": "display: flex; justify-content: space-around; gap: 3em; margin-top: 25px;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".application",
                                    "styleLess": "justify-content: space-around; gap: 400px;"
                                },
                                "medium": {
                                    "sel": ".application",
                                    "styleLess": "gap: 60px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "78692b1d-1acf-4451-8816-8ed770fceee2",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".full-screen",
                            "styleLess": "width: 90%; height: 350px; margin: 20px 15px 10px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "ad41f6f8-ff8d-4bb3-82a3-918a181a6bfe",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".note-three",
                            "styleLess": "font-size: 15px; line-height: 30px; color: rgb(52, 64, 84); margin: 20px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "51f9671d-b912-4d43-af98-1038811f9b68",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".note-two",
                            "styleLess": "font-size: 15px; line-height: 30px; color: rgb(52, 64, 84); margin: 20px;",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".note-two",
                                    "styleLess": "display: none;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "c9cd59ac-41c5-49d9-b598-0ab80384dc60",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".concepts",
                            "styleLess": "font-size: 25px; margin-top: 50px; padding-left: 20px;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".concepts",
                                    "styleLess": "margin-left: 20px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "b0948c5e-8a82-4ab1-a9db-06b43eaefd43",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".footing",
                            "styleLess": "display: flex; margin-top: 20px; justify-content: space-around; gap: 10em;",
                            "type": "class",
                            "variants": {
                                "small": {
                                    "sel": ".footing",
                                    "styleLess": "justify-content: space-around; gap: 35em;"
                                },
                                "medium": {
                                    "sel": ".footing",
                                    "styleLess": "gap: 51em;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "a9dc6595-54dd-479e-a69a-fc6f430e88b5",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": "",
                            "sel": ".arrow-up",
                            "styleLess": "width: 28px; height: 30px; border: 1px solid; border-radius: 50px; padding: 4px;",
                            "type": "class",
                            "variants": {}
                        }
                    },
                    {
                        "style_id": "cfff355d-9667-470a-b667-c3138e2edfa4",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": ".ellipse",
                            "sel": ".ellipse",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".ellipse",
                                    "styleLess": "width: 8px; height: 8px; border-radius: 5px; background-color: rgb(3, 152, 85); margin-top: 7px;"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "02dc6805-f667-4818-bd5e-fbd1bebb2208",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": ".available-freelance",
                            "sel": ".available-freelance",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".available-freelance",
                                    "styleLess": "display: flex; padding: 0px 10px; gap: 7px; height: 25px; margin-left: 50px; border-radius: 12px; background-color: rgb(242, 244, 247);"
                                }
                            }
                        }
                    },
                    {
                        "style_id": "3860e1d2-d94b-4d35-9825-7b60acc6a0d1",
                        "data": {
                            "comb": "",
                            "affects": {},
                            "children": [],
                            "name": ".concept",
                            "sel": ".concept",
                            "styleLess": "",
                            "type": "class",
                            "variants": {
                                "medium": {
                                    "sel": ".concept",
                                    "styleLess": "display: flex; gap: 50px; text-align: justify; padding: 10px 20px 30px 50px;"
                                }
                            }
                        }
                    }
                ]
            },
        }
    ]
}





const homePage = {
    "route": "/index.html",
    "name": "Home-page",
    "head": {
        "title":"Home",
        "description":" This is the home page for portfolio"
    },
    "slug":"idkk3JXrgA-8z33-EMVA-jB2o",           
    "page_id":"iduqFVh0UK-NBmw-AfbB-KeoW-LleWiezlqEwg",
    "nodes":[
        {
            "_id": "ido5KXu257-NUhX-onby-5PkF-IwKapv0g7he3",
            "tag": "main",
            "classes": [],
            "data": {},
            "children": [
                "id1fDaCNPw-Z24F-TUiv-i0u5-3PfQN3sKXF56",
                "id68Bw6CGv-W1sH-TLpn-jp1M-py43kCvZZsOO",
                "idddXhErex-1yIT-JgrZ-yPgL-UuWhJ8ayLBbu",
                "idcWWdDvsI-kstX-qtBp-yoeG-WH63etJzzBGC",
                "idcOI9sIQI-GUDP-WAnj-90BK-NgJyZCfrHUgI",
                "idZABKJIci-tlxb-S449-9Bpu-ydKwFa5QitmX",
                "idSNBY8sxi-Y2rj-pHeT-F8gv-7WjteMtNt1A3",
                "idq8HCKNhT-9kIU-xbpl-osRc-XeXD1eUFkvZ6",
                "idvX5oc2kZ-VUlu-TdQf-Nrhs-VTiKDiDX3p0X",
                "idwuNNy7nr-UIth-bchM-o2YO-JHl5IlNC0ugQ",
                "idFwrvEyXf-CRVf-pJqA-XbGw-BeRZBGIZ9SJx",
                "idPk0NRXMh-N1l2-SC3b-ve94-wClJn8oK3Fo5",
                "ida3cw0y5g-cZZe-ebEi-sliH-yOX44KWBTfiF"
            ],
            "type": "Main"
        },
        {
            "_id": "idQdtyCuj8-51SC-xWq2-zugJ-G0CAGRgPszVi",
            "tag": "img",
            "classes": [
                "product-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709544146469-Ellipse%20151.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idTQKZuquo-LrkT-6BJ1-WNTM-9h8ZnCZU1B9B",
            "text": true,
            "v": "Kiara Jones"
        },
        {
            "_id": "idEYvd7WRt-sxiH-VQdW-ebxx-S2y8Aa4p9wrT",
            "tag": "h4",
            "classes": [
                "product-name"
            ],
            "data": {},
            "children": [
                "idTQKZuquo-LrkT-6BJ1-WNTM-9h8ZnCZU1B9B"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idUvJic2DD-ZHQa-4NfF-mDYY-JYuTC9hhh3Sy",
            "text": true,
            "v": "Product Designer"
        },
        {
            "_id": "idUA8jAJnj-FGFx-mrN3-XGNX-ouGCAiUnvHVy",
            "tag": "h4",
            "classes": [
                "designer"
            ],
            "data": {},
            "children": [
                "idUvJic2DD-ZHQa-4NfF-mDYY-JYuTC9hhh3Sy"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idH49RzVMR-qvV2-3paN-KAfC-Jlfz7i9Qbbef",
            "tag": "div",
            "classes": [
                "nav_bio"
            ],
            "data": {},
            "children": [
                "idEYvd7WRt-sxiH-VQdW-ebxx-S2y8Aa4p9wrT",
                "idUA8jAJnj-FGFx-mrN3-XGNX-ouGCAiUnvHVy"
            ],
            "type": "Container"
        },
        {
            "_id": "id51OTdSri-HQdt-ubdK-76xV-yOgbkRjj6dVX",
            "tag": "div",
            "classes": [
                "product-designer"
            ],
            "data": {},
            "children": [
                "idQdtyCuj8-51SC-xWq2-zugJ-G0CAGRgPszVi",
                "idH49RzVMR-qvV2-3paN-KAfC-Jlfz7i9Qbbef"
            ],
            "type": "Container"
        },
        {
            "_id": "idTB55BWAV-HsMp-HrRj-Uzl9-1IesZIgF92BS",
            "tag": "div",
            "classes": [],
            "data": {},
            "children": [
                "id51OTdSri-HQdt-ubdK-76xV-yOgbkRjj6dVX"
            ],
            "type": "Container"
        },
        {
            "_id": "idHFvEEcnV-le83-IO6L-Fwr1-CB3KTAiecRER",
            "text": true,
            "v": "Work"
        },
        {
            "_id": "idySChNSSD-diof-m5I0-wgpk-FPx42OftSI4x",
            "tag": "a",
            "classes": [
                "header-icons"
            ],
            "data": {
                "href": "./spear.html"
            },
            "children": [
                "idHFvEEcnV-le83-IO6L-Fwr1-CB3KTAiecRER"
            ],
            "type": "Link"
        },
        {
            "_id": "idhxJ7AhK9-Wm9X-kZSL-giiX-jPJQPjXyVste",
            "tag": "li",
            "classes": [],
            "data": {},
            "children": [
                "idySChNSSD-diof-m5I0-wgpk-FPx42OftSI4x"
            ],
            "type": "List Item"
        },
        {
            "_id": "idBpsh7hk9-u4OB-Lam9-A4V2-B7FFaMnDMETC",
            "text": true,
            "v": "About"
        },
        {
            "_id": "id8ADNmMme-3dsf-wLo4-1MmU-UsedPynqgDGt",
            "tag": "a",
            "classes": [
                "header-icons"
            ],
            "data": {
                "href": "About"
            },
            "children": [
                "idBpsh7hk9-u4OB-Lam9-A4V2-B7FFaMnDMETC"
            ],
            "type": "Link"
        },
        {
            "_id": "idlXRK3crj-78DY-Q1Mt-WBDG-FwxD1YzbcTmN",
            "tag": "li",
            "classes": [],
            "data": {},
            "children": [
                "id8ADNmMme-3dsf-wLo4-1MmU-UsedPynqgDGt"
            ],
            "type": "List Item"
        },
        {
            "_id": "idpBpEzPxm-IATP-NTWM-6NET-pYMn05eATAjO",
            "text": true,
            "v": "Contact"
        },
        {
            "_id": "idhJkNABvp-W36Y-wq4D-U5bK-xMKD2XuxDcii",
            "tag": "a",
            "classes": [
                "header-icons"
            ],
            "data": {
                "href": "Contact"
            },
            "children": [
                "idpBpEzPxm-IATP-NTWM-6NET-pYMn05eATAjO"
            ],
            "type": "Link"
        },
        {
            "_id": "idH934Jfzw-w4ev-65IB-bym6-P88k6I9ZO4KJ",
            "tag": "li",
            "classes": [],
            "data": {},
            "children": [
                "idhJkNABvp-W36Y-wq4D-U5bK-xMKD2XuxDcii"
            ],
            "type": "List Item"
        },
        {
            "_id": "idGha8D6VY-YgOf-nMb9-Ihp7-nWfjTAS4ooec",
            "tag": "ul",
            "classes": [
                "header",
                "header-list"
            ],
            "data": {},
            "children": [
                "idhxJ7AhK9-Wm9X-kZSL-giiX-jPJQPjXyVste",
                "idlXRK3crj-78DY-Q1Mt-WBDG-FwxD1YzbcTmN",
                "idH934Jfzw-w4ev-65IB-bym6-P88k6I9ZO4KJ"
            ],
            "type": "Unordered List"
        },
        {
            "_id": "idAKpzYION-e9qh-WHcE-hlRb-wHp5QEKI0jrn",
            "tag": "div",
            "classes": [
                "ellipse"
            ],
            "data": {},
            "children": [],
            "type": "Container"
        },
        {
            "_id": "idJNklQcUy-0Jj4-JQ30-JI1A-SETsoq0ipvSM",
            "text": true,
            "v": "Available for freelance"
        },
        {
            "_id": "idjodIAVw9-vZn0-Vs8Z-q3LH-cPdWQejiJINF",
            "tag": "a",
            "classes": [
                "freelance"
            ],
            "data": {
                "href": "Available for freelance"
            },
            "children": [
                "idJNklQcUy-0Jj4-JQ30-JI1A-SETsoq0ipvSM"
            ],
            "type": "Link"
        },
        {
            "_id": "id2tVf1bDA-TbCF-9p7s-Zrdg-a5wA0hi4RvU8",
            "tag": "li",
            "classes": [],
            "data": {},
            "children": [
                "idjodIAVw9-vZn0-Vs8Z-q3LH-cPdWQejiJINF"
            ],
            "type": "List Item"
        },
        {
            "_id": "idNTBeJbHV-me65-N1qO-0wVa-mtWCUN1mtjch",
            "tag": "ul",
            "classes": [
                "available-freelance",
                "header-list"
            ],
            "data": {},
            "children": [
                "idAKpzYION-e9qh-WHcE-hlRb-wHp5QEKI0jrn",
                "id2tVf1bDA-TbCF-9p7s-Zrdg-a5wA0hi4RvU8"
            ]
        },
        {
            "_id": "idFOMORR2R-Xs2N-o8eI-9nTY-ZDo1cVpCkxtE",
            "tag": "img",
            "classes": [
                "menu-icon"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709418812514-Menu%20Icon.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idfaUeSEMq-IMYk-UUFL-6gkm-P4AlfMiJefqf",
            "tag": "nav",
            "classes": [
                "header"
            ],
            "data": {},
            "children": [
                "idTB55BWAV-HsMp-HrRj-Uzl9-1IesZIgF92BS",
                "idGha8D6VY-YgOf-nMb9-Ihp7-nWfjTAS4ooec",
                "idNTBeJbHV-me65-N1qO-0wVa-mtWCUN1mtjch",
                "idFOMORR2R-Xs2N-o8eI-9nTY-ZDo1cVpCkxtE"
            ],
            "type": "Navigation"
        },
        {
            "_id": "id1fDaCNPw-Z24F-TUiv-i0u5-3PfQN3sKXF56",
            "tag": "header",
            "classes": [],
            "data": {},
            "children": [
                "idfaUeSEMq-IMYk-UUFL-6gkm-P4AlfMiJefqf"
            ],
            "type": "Header"
        },
        {
            "_id": "id68Bw6CGv-W1sH-TLpn-jp1M-py43kCvZZsOO",
            "tag": "hr",
            "classes": [
                "header_hr"
            ],
            "data": {},
            "children": []
        },
        {
            "_id": "idtyj7GPlV-qkP1-zV80-0O2x-G5WNz8pd4CFT",
            "text": true,
            "v": "Product Designer From United Kingdom"
        },
        {
            "_id": "idmumaLd3r-JkHp-fCs7-ctkr-6FcZtoxhQUDo",
            "tag": "h1",
            "classes": [
                "product-head"
            ],
            "data": {},
            "children": [
                "idtyj7GPlV-qkP1-zV80-0O2x-G5WNz8pd4CFT"
            ],
            "type": "Heading 1"
        },
        {
            "_id": "idvzX5t7eQ-wVwY-eP82-8mop-zyCSEXa57Ja5",
            "text": true,
            "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n            egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n            montes senectus. Lorem ipsum dolor sit amet consectetur. Quam eget\n            in porttitor egestas amet. Cum et feugiat porta pretium. Suscipit et\n            tempus montes senectus."
        },
        {
            "_id": "idYx2X9X0j-nSlU-sJzA-qhOp-I6AQuuRx1d6o",
            "tag": "p",
            "classes": [],
            "data": {},
            "children": [
                "idvzX5t7eQ-wVwY-eP82-8mop-zyCSEXa57Ja5"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idyOKy81Sm-R7OF-DPMK-i9X7-JcxlzsQ3E3wR",
            "tag": "div",
            "classes": [
                "product-note"
            ],
            "data": {},
            "children": [
                "idmumaLd3r-JkHp-fCs7-ctkr-6FcZtoxhQUDo",
                "idYx2X9X0j-nSlU-sJzA-qhOp-I6AQuuRx1d6o"
            ],
            "type": "Container"
        },
        {
            "_id": "idIVEQMQid-Vkxn-M5FW-tYEc-GRKU1azqtdFU",
            "tag": "img",
            "classes": [
                "design-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709548574354-Frame%201216400724%20%287%29.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "iduH0YQjpT-dSoB-mWzm-5ixh-MGbI4Ubejz0C",
            "tag": "div",
            "classes": [
                "product_UK-img"
            ],
            "data": {},
            "children": [
                "idIVEQMQid-Vkxn-M5FW-tYEc-GRKU1azqtdFU"
            ]
        },
        {
            "_id": "idddXhErex-1yIT-JgrZ-yPgL-UuWhJ8ayLBbu",
            "tag": "div",
            "classes": [
                "product-uk"
            ],
            "data": {},
            "children": [
                "idyOKy81Sm-R7OF-DPMK-i9X7-JcxlzsQ3E3wR",
                "iduH0YQjpT-dSoB-mWzm-5ixh-MGbI4Ubejz0C"
            ],
            "type": "Container"
        },
        {
            "_id": "idcWWdDvsI-kstX-qtBp-yoeG-WH63etJzzBGC",
            "tag": "hr",
            "classes": [],
            "data": {},
            "children": []
        },
        {
            "_id": "idZtLvYSVg-Lxdb-U0k3-wmbV-k4caahm9vPVX",
            "text": true,
            "v": "Work"
        },
        {
            "_id": "idcOI9sIQI-GUDP-WAnj-90BK-NgJyZCfrHUgI",
            "tag": "h4",
            "classes": [
                "works"
            ],
            "data": {},
            "children": [
                "idZtLvYSVg-Lxdb-U0k3-wmbV-k4caahm9vPVX"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idZEQrTGCZ-znnY-v0n1-6ZqE-W1gw0yVyjgfS",
            "tag": "img",
            "classes": [
                "work-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709553344095-Rectangle%20518%20%281%29.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idz6iMmKYm-sfby-PKUF-hzeB-AwCzTXdDtHdK",
            "text": true,
            "v": "Skincare X"
        },
        {
            "_id": "idyzLGnYon-JtKL-8LHw-Es28-ZzyI3qKTfm6e",
            "tag": "h4",
            "classes": [
                "product-title"
            ],
            "data": {},
            "children": [
                "idz6iMmKYm-sfby-PKUF-hzeB-AwCzTXdDtHdK"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idjJsGVJVh-A0K5-XdD8-57YL-j6f8txvsnTJH",
            "text": true,
            "v": "Web Design"
        },
        {
            "_id": "idSthkinEV-s3c5-kjQ9-DlSD-F4vEURkzkoUc",
            "tag": "p",
            "classes": [
                "product-role"
            ],
            "data": {},
            "children": [
                "idjJsGVJVh-A0K5-XdD8-57YL-j6f8txvsnTJH"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idBjX1wWHY-oqVj-2rto-PfTp-yFsA0gHoCHT6",
            "tag": "div",
            "classes": [
                "work"
            ],
            "data": {},
            "children": [
                "idZEQrTGCZ-znnY-v0n1-6ZqE-W1gw0yVyjgfS",
                "idyzLGnYon-JtKL-8LHw-Es28-ZzyI3qKTfm6e",
                "idSthkinEV-s3c5-kjQ9-DlSD-F4vEURkzkoUc"
            ],
            "type": "Container"
        },
        {
            "_id": "idEgQOj27i-uW5E-KdLt-mweZ-wzFDojXxZJg9",
            "tag": "img",
            "classes": [
                "work-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709553956271-Rectangle 518 (2).png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idG0CIOcTM-i2WF-oSH7-wzGt-Tc4I7Fql3sCm",
            "text": true,
            "v": "Wellness Y"
        },
        {
            "_id": "idbzSttUYz-rwCQ-h7Zs-kAHa-LqBW0xDX0idY",
            "tag": "h4",
            "classes": [
                "product-title"
            ],
            "data": {},
            "children": [
                "idG0CIOcTM-i2WF-oSH7-wzGt-Tc4I7Fql3sCm"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "id1cmfhp0x-W9IC-L0zI-nutF-dMqUBXjj9d5Q",
            "text": true,
            "v": "UI/UX Design"
        },
        {
            "_id": "idQcxlT8un-lhIO-McZP-Moha-T4Jx8qLWdKI9",
            "tag": "p",
            "classes": [
                "product-role"
            ],
            "data": {},
            "children": [
                "id1cmfhp0x-W9IC-L0zI-nutF-dMqUBXjj9d5Q"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idsfxQ3l8x-x6ft-ypzo-UbSp-I34JQ3ZHmDv8",
            "tag": "div",
            "classes": [
                "work"
            ],
            "data": {},
            "children": [
                "idEgQOj27i-uW5E-KdLt-mweZ-wzFDojXxZJg9",
                "idbzSttUYz-rwCQ-h7Zs-kAHa-LqBW0xDX0idY",
                "idQcxlT8un-lhIO-McZP-Moha-T4Jx8qLWdKI9"
            ],
            "type": "Container"
        },
        {
            "_id": "idZABKJIci-tlxb-S449-9Bpu-ydKwFa5QitmX",
            "tag": "div",
            "classes": [
                "work-section"
            ],
            "data": {},
            "children": [
                "idBjX1wWHY-oqVj-2rto-PfTp-yFsA0gHoCHT6",
                "idsfxQ3l8x-x6ft-ypzo-UbSp-I34JQ3ZHmDv8"
            ],
            "type": "Container"
        },
        {
            "_id": "idchFgVsCc-6cdN-DAmj-MYyt-ZICrbHXNgsKd",
            "tag": "img",
            "classes": [
                "work-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709555220258-Rectangle%20518%20%283%29.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idXsvq31gU-Ig4Y-6m90-70ed-oFbqC70VpPGB",
            "text": true,
            "v": "Healthcare Z"
        },
        {
            "_id": "idYnYk1Orv-O8i6-U4Oa-DmFC-btqBMkJIh581",
            "tag": "h4",
            "classes": [
                "product-title"
            ],
            "data": {},
            "children": [
                "idXsvq31gU-Ig4Y-6m90-70ed-oFbqC70VpPGB"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idbVNrWVAc-hnXi-hhTJ-S7OF-tyTgKdJfQAll",
            "text": true,
            "v": "Branding"
        },
        {
            "_id": "idn4IHUTFV-tUnP-N9jy-SLl2-UE8TOGgCVCfv",
            "tag": "p",
            "classes": [
                "product-role"
            ],
            "data": {},
            "children": [
                "idbVNrWVAc-hnXi-hhTJ-S7OF-tyTgKdJfQAll"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "id3QCGFlgK-5gF2-1AD4-jzpF-SmpRuvofyHYC",
            "tag": "div",
            "classes": [
                "work"
            ],
            "data": {},
            "children": [
                "idchFgVsCc-6cdN-DAmj-MYyt-ZICrbHXNgsKd",
                "idYnYk1Orv-O8i6-U4Oa-DmFC-btqBMkJIh581",
                "idn4IHUTFV-tUnP-N9jy-SLl2-UE8TOGgCVCfv"
            ],
            "type": "Container"
        },
        {
            "_id": "idlRfEgPne-MKHn-tD0N-NEPW-qsmJJxuWSgbl",
            "tag": "img",
            "classes": [
                "work-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709555294312-Rectangle%20518%20%284%29.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "ideVu2ZdTm-snh7-QU0H-t9zL-t9bUiHbhY6Fq",
            "text": true,
            "v": "Fleece"
        },
        {
            "_id": "id38xtCALw-e2uy-CYdd-Ve7m-2jQ2lpYRWQAn",
            "tag": "h4",
            "classes": [
                "product-title"
            ],
            "data": {},
            "children": [
                "ideVu2ZdTm-snh7-QU0H-t9zL-t9bUiHbhY6Fq"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idhjGwzpTF-rnBq-WaCv-7rjk-vvXhPG2BA5C7",
            "text": true,
            "v": "Web Design"
        },
        {
            "_id": "idDS4CRv7H-kfxP-wY2Q-Q6sG-8H0eiUY6X7ql",
            "tag": "p",
            "classes": [
                "product-role"
            ],
            "data": {},
            "children": [
                "idhjGwzpTF-rnBq-WaCv-7rjk-vvXhPG2BA5C7"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idESnKVGYD-LuJW-kanW-OcV7-BTn0NcUzmPfd",
            "tag": "div",
            "classes": [
                "work"
            ],
            "data": {},
            "children": [
                "idlRfEgPne-MKHn-tD0N-NEPW-qsmJJxuWSgbl",
                "id38xtCALw-e2uy-CYdd-Ve7m-2jQ2lpYRWQAn",
                "idDS4CRv7H-kfxP-wY2Q-Q6sG-8H0eiUY6X7ql"
            ],
            "type": "Container"
        },
        {
            "_id": "idSNBY8sxi-Y2rj-pHeT-F8gv-7WjteMtNt1A3",
            "tag": "div",
            "classes": [
                "work-section"
            ],
            "data": {},
            "children": [
                "id3QCGFlgK-5gF2-1AD4-jzpF-SmpRuvofyHYC",
                "idESnKVGYD-LuJW-kanW-OcV7-BTn0NcUzmPfd"
            ],
            "type": "Container"
        },
        {
            "_id": "idmc9X6lNB-Qu4P-hbPZ-VZTB-GRObvzBKwSf9",
            "tag": "img",
            "classes": [
                "work-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709556135560-Rectangle%20518%20%285%29.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "ids8lYCd5L-Avfq-c8LT-stuX-rbnVtL5y9wWE",
            "text": true,
            "v": "Responsive"
        },
        {
            "_id": "idfxV1XOmg-v47e-ehPq-WTrM-XpVTdcaap7B1",
            "tag": "h4",
            "classes": [
                "product-title"
            ],
            "data": {},
            "children": [
                "ids8lYCd5L-Avfq-c8LT-stuX-rbnVtL5y9wWE"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idLHXHNyIO-z83G-hmqJ-bgAw-HSvwLUMq9VR3",
            "text": true,
            "v": "Product Design"
        },
        {
            "_id": "idGbvLuJzm-uNM5-0Anh-dbpI-TZMCLdc5kBET",
            "tag": "p",
            "classes": [
                "product-role"
            ],
            "data": {},
            "children": [
                "idLHXHNyIO-z83G-hmqJ-bgAw-HSvwLUMq9VR3"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idBULVlX8t-WLxX-KaSI-gNwU-sIyR9TohoW6Y",
            "tag": "div",
            "classes": [
                "work"
            ],
            "data": {},
            "children": [
                "idmc9X6lNB-Qu4P-hbPZ-VZTB-GRObvzBKwSf9",
                "idfxV1XOmg-v47e-ehPq-WTrM-XpVTdcaap7B1",
                "idGbvLuJzm-uNM5-0Anh-dbpI-TZMCLdc5kBET"
            ],
            "type": "Container"
        },
        {
            "_id": "id6RhTRbfJ-wWk2-XAM6-Xwbr-oxGJmG8d18lM",
            "tag": "img",
            "classes": [
                "work-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709556209738-Rectangle 518 (6).png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idp9Jdn2RY-wWK2-NaaG-ycz0-Wr6s4HI6lOkD",
            "text": true,
            "v": "Get Fit"
        },
        {
            "_id": "idlxkMpXJb-VDeW-iD9i-OU1x-MmhDlwbysTom",
            "tag": "h4",
            "classes": [
                "product-title"
            ],
            "data": {},
            "children": [
                "idp9Jdn2RY-wWK2-NaaG-ycz0-Wr6s4HI6lOkD"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idnj6OlBlA-6cRS-5kBe-oo66-oXMblQaEiXbo",
            "text": true,
            "v": "Web Design"
        },
        {
            "_id": "idUFZbik1k-DlSY-GwJ3-OYM4-3ZrxbDFTGhkc",
            "tag": "p",
            "classes": [
                "product-role"
            ],
            "data": {},
            "children": [
                "idnj6OlBlA-6cRS-5kBe-oo66-oXMblQaEiXbo"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idTb1A2Ago-03zj-H8FE-GimM-Y7ozBCNMqyAS",
            "tag": "div",
            "classes": [
                "work"
            ],
            "data": {},
            "children": [
                "id6RhTRbfJ-wWk2-XAM6-Xwbr-oxGJmG8d18lM",
                "idlxkMpXJb-VDeW-iD9i-OU1x-MmhDlwbysTom",
                "idUFZbik1k-DlSY-GwJ3-OYM4-3ZrxbDFTGhkc"
            ],
            "type": "Container"
        },
        {
            "_id": "idq8HCKNhT-9kIU-xbpl-osRc-XeXD1eUFkvZ6",
            "tag": "div",
            "classes": [
                "work-section"
            ],
            "data": {},
            "children": [
                "idBULVlX8t-WLxX-KaSI-gNwU-sIyR9TohoW6Y",
                "idTb1A2Ago-03zj-H8FE-GimM-Y7ozBCNMqyAS"
            ],
            "type": "Container"
        },
        {
            "_id": "idtmmA5waD-I1rM-JION-ebej-HzpBUPrwauI0",
            "text": true,
            "v": "About"
        },
        {
            "_id": "idLo5wsUgD-hmjf-j8eJ-pWP8-JiBvzydWxMra",
            "tag": "h4",
            "classes": [
                "about"
            ],
            "data": {},
            "children": [
                "idtmmA5waD-I1rM-JION-ebej-HzpBUPrwauI0"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "id85krWuJX-AufG-Ucrg-0Z9N-LTi2uKNmjO0w",
            "tag": "img",
            "classes": [
                "about-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709556744613-Frame%201216400724%20%288%29.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "id0xn7iaKh-36gm-WwLl-ZmyD-9rdoYo5IQgiH",
            "text": true,
            "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n            egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n            montes senectus. Lorem ipsum dolor sit amet consectetur. Quam eget\n            in porttitor egestas amet. Cum et feugiat porta pretium. Suscipit et\n            tempus montes senectus.Lorem ipsum dolor sit amet consectetur. Quam\n            eget in porttitor egestas amet. Cum et feugiat porta pretium.\n            Suscipit et tempus montes senectus."
        },
        {
            "_id": "idQqFdhtce-uNhR-rjKp-MAGW-eyOlLYTSEZW8",
            "tag": "p",
            "classes": [],
            "data": {},
            "children": [
                "id0xn7iaKh-36gm-WwLl-ZmyD-9rdoYo5IQgiH"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idwbEeRixw-Uzfr-VXc0-6buk-ni67nfUQEj8C",
            "text": true,
            "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n            egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n            montes senectus.Lorem ipsum dolor sit amet consectetur. Quam eget in\n            porttitor egestas amet. Cum et feugiat porta pretium."
        },
        {
            "_id": "idDJcRFS5h-50SC-gRCv-YLYC-ZvqsVSdgLiB4",
            "tag": "p",
            "classes": [],
            "data": {},
            "children": [
                "idwbEeRixw-Uzfr-VXc0-6buk-ni67nfUQEj8C"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idukhzV9GU-h2eG-uSIL-Mn1Z-7Wdk3wR5cn6M",
            "tag": "div",
            "classes": [
                "about-section"
            ],
            "data": {},
            "children": [
                "idLo5wsUgD-hmjf-j8eJ-pWP8-JiBvzydWxMra",
                "id85krWuJX-AufG-Ucrg-0Z9N-LTi2uKNmjO0w",
                "idQqFdhtce-uNhR-rjKp-MAGW-eyOlLYTSEZW8",
                "idDJcRFS5h-50SC-gRCv-YLYC-ZvqsVSdgLiB4"
            ],
            "type": "Container"
        },
        {
            "_id": "id7goYduvq-u9TS-8VwV-6Re1-vgVXRHaQVDAs",
            "tag": "div",
            "classes": [
                "horizontal"
            ],
            "data": {},
            "children": [],
            "type": "Container"
        },
        {
            "_id": "id3VYplOWG-UC4p-4KmY-mlVf-R0QYZXsBxYp0",
            "text": true,
            "v": "Service"
        },
        {
            "_id": "idqvJaYhug-4cR7-ucvc-nSIu-kCtcVHHjSj0D",
            "tag": "h4",
            "classes": [
                "service"
            ],
            "data": {},
            "children": [
                "id3VYplOWG-UC4p-4KmY-mlVf-R0QYZXsBxYp0"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idRz7qbdQB-24OK-4x7I-bDet-ekgkMAv4URTc",
            "text": true,
            "v": "Creativity"
        },
        {
            "_id": "id9a6k0lzC-OmV9-TUFL-IqgH-Dbmo8Vu4k5wK",
            "tag": "li",
            "classes": [
                "service-list"
            ],
            "data": {},
            "children": [
                "idRz7qbdQB-24OK-4x7I-bDet-ekgkMAv4URTc"
            ],
            "type": "List Item"
        },
        {
            "_id": "idaHZluVqE-wT5d-8tln-loj9-8GANiXEDeEGL",
            "text": true,
            "v": "Branding"
        },
        {
            "_id": "idhX0N7erN-Prx0-eOte-YIMr-m9V01VjJ0HgS",
            "tag": "li",
            "classes": [
                "service-list"
            ],
            "data": {},
            "children": [
                "idaHZluVqE-wT5d-8tln-loj9-8GANiXEDeEGL"
            ],
            "type": "List Item"
        },
        {
            "_id": "idsjaoTAfL-ueMN-x12H-JG3p-pJWFbMgC182K",
            "tag": "ul",
            "classes": [
                "service-service"
            ],
            "data": {},
            "children": [
                "id9a6k0lzC-OmV9-TUFL-IqgH-Dbmo8Vu4k5wK",
                "idhX0N7erN-Prx0-eOte-YIMr-m9V01VjJ0HgS"
            ],
            "type": "Unordered List"
        },
        {
            "_id": "idURVbc1G5-JJTP-PcMr-hlPX-VIBox5vCsGYm",
            "text": true,
            "v": "Art & Design"
        },
        {
            "_id": "id2sugithR-MNt4-FIV0-QB1J-cFoSh9uVCjo2",
            "tag": "li",
            "classes": [
                "service-list"
            ],
            "data": {},
            "children": [
                "idURVbc1G5-JJTP-PcMr-hlPX-VIBox5vCsGYm"
            ],
            "type": "List Item"
        },
        {
            "_id": "idXd6FqJ81-JQOg-2mYb-ghKG-VCHrHHh8gYs7",
            "text": true,
            "v": "Product Design"
        },
        {
            "_id": "idTAnhT59d-doUQ-kJTb-fkuR-xNkWWPE81wrT",
            "tag": "li",
            "classes": [
                "service-list"
            ],
            "data": {},
            "children": [
                "idXd6FqJ81-JQOg-2mYb-ghKG-VCHrHHh8gYs7"
            ],
            "type": "List Item"
        },
        {
            "_id": "idt9bfye6H-G9LX-uZp7-v02n-ALriiPUGvXLy",
            "tag": "ul",
            "classes": [
                "service-service"
            ],
            "data": {},
            "children": [
                "id2sugithR-MNt4-FIV0-QB1J-cFoSh9uVCjo2",
                "idTAnhT59d-doUQ-kJTb-fkuR-xNkWWPE81wrT"
            ],
            "type": "Unordered List"
        },
        {
            "_id": "idj9lIOGLq-iS23-8CNr-YTDp-cK0ja5F01DvR",
            "tag": "div",
            "classes": [
                "services"
            ],
            "data": {},
            "children": [
                "idsjaoTAfL-ueMN-x12H-JG3p-pJWFbMgC182K",
                "idt9bfye6H-G9LX-uZp7-v02n-ALriiPUGvXLy"
            ],
            "type": "Container"
        },
        {
            "_id": "idDY9QqEaL-D3sV-jewX-akid-63ApdqDBetIl",
            "tag": "hr",
            "classes": [
                "header_hr"
            ],
            "data": {
                "data-horizontal": "",
                "line": ""
            },
            "children": []
        },
        {
            "_id": "idG1RDYMBa-Z35N-I4Cu-eui3-hWCk3TeGknns",
            "text": true,
            "v": "Experience"
        },
        {
            "_id": "idNEGZKsJj-7g4p-IpEj-HelR-Eywb0ZmJBgAA",
            "tag": "h4",
            "classes": [
                "experience"
            ],
            "data": {},
            "children": [
                "idG1RDYMBa-Z35N-I4Cu-eui3-hWCk3TeGknns"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idFmgPfuTc-rlqd-zYHE-2R9S-fBXhTwounrFj",
            "text": true,
            "v": "Design lead"
        },
        {
            "_id": "idS7QPpgGG-fvdb-zFNZ-W2wl-tRFhUWA5xIhI",
            "tag": "h5",
            "classes": [],
            "data": {},
            "children": [
                "idFmgPfuTc-rlqd-zYHE-2R9S-fBXhTwounrFj"
            ],
            "type": "Paragrpah"
        },
        {
            "_id": "idhwpelqqc-Co0T-1oFf-ejwK-IcC2YIaZubtb",
            "tag": "div",
            "classes": [
                "lineheight"
            ],
            "data": {},
            "children": [],
            "type": "Container"
        },
        {
            "_id": "id7bso9ROd-N5kz-D5Zt-bWwN-xFsrpZ1YjjjF",
            "text": true,
            "v": "New Balance"
        },
        {
            "_id": "idKrHtuzYy-rXka-ST48-yGI5-ENpeexA8B6Sz",
            "tag": "h5",
            "classes": [],
            "data": {},
            "children": [
                "id7bso9ROd-N5kz-D5Zt-bWwN-xFsrpZ1YjjjF"
            ],
            "type": "Paragrpah"
        },
        {
            "_id": "idofLOmB0V-DCaD-qPa0-Y0Pi-vcdQrMa5gtgM",
            "tag": "div",
            "classes": [
                "linestyle"
            ],
            "data": {},
            "children": [
                "idS7QPpgGG-fvdb-zFNZ-W2wl-tRFhUWA5xIhI",
                "idhwpelqqc-Co0T-1oFf-ejwK-IcC2YIaZubtb",
                "idKrHtuzYy-rXka-ST48-yGI5-ENpeexA8B6Sz"
            ],
            "type": "Container"
        },
        {
            "_id": "idfLzofblz-sDXo-qoqt-WBVs-s7rJQLro2g2u",
            "text": true,
            "v": "2023-Now"
        },
        {
            "_id": "idUuRJzSLL-Eeuy-4AsU-0Bm5-uRncAdtOHaJ2",
            "tag": "p",
            "classes": [],
            "data": {},
            "children": [
                "idfLzofblz-sDXo-qoqt-WBVs-s7rJQLro2g2u"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idR2joRe0V-lvqL-lvf2-AqeE-AMrV0tYdHDeg",
            "tag": "div",
            "classes": [
                "experience-date"
            ],
            "data": {},
            "children": [
                "idUuRJzSLL-Eeuy-4AsU-0Bm5-uRncAdtOHaJ2"
            ],
            "type": "Container"
        },
        {
            "_id": "idfx3Enbit-hcNB-K9Aq-E2p0-A26VxyHC3b38",
            "tag": "div",
            "classes": [
                "experience-list"
            ],
            "data": {},
            "children": [
                "idofLOmB0V-DCaD-qPa0-Y0Pi-vcdQrMa5gtgM",
                "idR2joRe0V-lvqL-lvf2-AqeE-AMrV0tYdHDeg"
            ],
            "type": "Container"
        },
        {
            "_id": "id2UX19Q2d-4fCN-vzB6-pXYS-qIvQKs45BOPX",
            "text": true,
            "v": "Associate Designer"
        },
        {
            "_id": "idamts6EiX-Nv2f-IReX-eUW2-kOWktost69xd",
            "tag": "h5",
            "classes": [],
            "data": {},
            "children": [
                "id2UX19Q2d-4fCN-vzB6-pXYS-qIvQKs45BOPX"
            ],
            "type": "Paragrpah"
        },
        {
            "_id": "idwwGIKkgE-Fpvu-IYvK-ZyFl-q37KvTg0Mxfs",
            "tag": "div",
            "classes": [
                "lineheight"
            ],
            "data": {},
            "children": [],
            "type": "Container"
        },
        {
            "_id": "idCMpy5Ybo-eiKI-hZ0G-VFHK-9vt2nnTwVtyw",
            "text": true,
            "v": "Nike"
        },
        {
            "_id": "idUaZSgTNk-6ELc-j5TW-K1Hs-f3VF2lnaxw5s",
            "tag": "h5",
            "classes": [],
            "data": {},
            "children": [
                "idCMpy5Ybo-eiKI-hZ0G-VFHK-9vt2nnTwVtyw"
            ],
            "type": "Paragrpah"
        },
        {
            "_id": "idsqL7RgOf-UfXp-EuHG-KllV-XAlHaUMlwKfH",
            "tag": "div",
            "classes": [
                "linestyle"
            ],
            "data": {},
            "children": [
                "idamts6EiX-Nv2f-IReX-eUW2-kOWktost69xd",
                "idwwGIKkgE-Fpvu-IYvK-ZyFl-q37KvTg0Mxfs",
                "idUaZSgTNk-6ELc-j5TW-K1Hs-f3VF2lnaxw5s"
            ],
            "type": "Container"
        },
        {
            "_id": "idJiJjsvvh-5MRE-0csk-kBnZ-g1iCNkomlymo",
            "text": true,
            "v": "2023-Now"
        },
        {
            "_id": "idbWTWrdaq-XaVV-0g65-6G0j-pkGPLwjLzL1y",
            "tag": "p",
            "classes": [],
            "data": {},
            "children": [
                "idJiJjsvvh-5MRE-0csk-kBnZ-g1iCNkomlymo"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idCiDRpWkj-G8yF-ONGD-BNa3-OcE1RB41hqmi",
            "tag": "div",
            "classes": [
                "experience-date"
            ],
            "data": {},
            "children": [
                "idbWTWrdaq-XaVV-0g65-6G0j-pkGPLwjLzL1y"
            ],
            "type": "Container"
        },
        {
            "_id": "idcsJl3G4f-N5GQ-L5AF-PsAk-A2ovIjzziy7G",
            "tag": "div",
            "classes": [
                "experience-list"
            ],
            "data": {},
            "children": [
                "idsqL7RgOf-UfXp-EuHG-KllV-XAlHaUMlwKfH",
                "idCiDRpWkj-G8yF-ONGD-BNa3-OcE1RB41hqmi"
            ],
            "type": "Container"
        },
        {
            "_id": "idtIHgST4v-J56V-o9HC-3VMo-NYsZ9HGh8dU1",
            "text": true,
            "v": "Associate Designer"
        },
        {
            "_id": "idGhrlG794-C1Ni-rH8g-mJ3v-cRCkVU7E7FNz",
            "tag": "h5",
            "classes": [],
            "data": {},
            "children": [
                "idtIHgST4v-J56V-o9HC-3VMo-NYsZ9HGh8dU1"
            ],
            "type": "Paragrpah"
        },
        {
            "_id": "idWq56V3QH-Y7To-N95w-nAiJ-7PLKtlk1M7F0",
            "tag": "div",
            "classes": [
                "lineheight"
            ],
            "data": {},
            "children": [],
            "type": "Container"
        },
        {
            "_id": "idFJn4hphu-fNRx-ye0M-giGp-RXAx9vFwMaTg",
            "text": true,
            "v": "Nike"
        },
        {
            "_id": "idditmdSnW-2wQh-ANpL-IPHG-iQH81l81kqEi",
            "tag": "h5",
            "classes": [],
            "data": {},
            "children": [
                "idFJn4hphu-fNRx-ye0M-giGp-RXAx9vFwMaTg"
            ],
            "type": "Paragrpah"
        },
        {
            "_id": "id0xHzxMov-pBkh-u6Lc-Pd4l-Fa48gBuehFOW",
            "tag": "div",
            "classes": [
                "linestyle"
            ],
            "data": {},
            "children": [
                "idGhrlG794-C1Ni-rH8g-mJ3v-cRCkVU7E7FNz",
                "idWq56V3QH-Y7To-N95w-nAiJ-7PLKtlk1M7F0",
                "idditmdSnW-2wQh-ANpL-IPHG-iQH81l81kqEi"
            ],
            "type": "Container"
        },
        {
            "_id": "idqOkjWtFi-UEb2-mXgv-wfgI-DSWZEOx3on1W",
            "text": true,
            "v": "2023-Now"
        },
        {
            "_id": "id3UtX1B6p-pb2W-nA6E-XhR2-gmNOtXcGlrEi",
            "tag": "p",
            "classes": [],
            "data": {},
            "children": [
                "idqOkjWtFi-UEb2-mXgv-wfgI-DSWZEOx3on1W"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "id8iGYt3Fe-CFeJ-efc8-JCG5-5fZ1XMO7Comg",
            "tag": "div",
            "classes": [
                "experience-date"
            ],
            "data": {},
            "children": [
                "id3UtX1B6p-pb2W-nA6E-XhR2-gmNOtXcGlrEi"
            ],
            "type": "Container"
        },
        {
            "_id": "id5q6nTjn8-7wNK-tQaD-eddX-ZIdJnngqU98I",
            "tag": "div",
            "classes": [
                "experience-list"
            ],
            "data": {},
            "children": [
                "id0xHzxMov-pBkh-u6Lc-Pd4l-Fa48gBuehFOW",
                "id8iGYt3Fe-CFeJ-efc8-JCG5-5fZ1XMO7Comg"
            ],
            "type": "Container"
        },
        {
            "_id": "idiOaVBf3H-tYFO-RswI-Icr2-cGkYdlf9q6nG",
            "text": true,
            "v": "Associate Designer"
        },
        {
            "_id": "id6CsOpy0E-fKVr-xFDB-yBg1-nplT3lMY6U0V",
            "tag": "h5",
            "classes": [],
            "data": {},
            "children": [
                "idiOaVBf3H-tYFO-RswI-Icr2-cGkYdlf9q6nG"
            ],
            "type": "Paragrpah"
        },
        {
            "_id": "idIHlqUMmf-rX3j-7k1o-RvLe-55ODqHyogg3P",
            "tag": "div",
            "classes": [
                "lineheight"
            ],
            "data": {},
            "children": [],
            "type": "Container"
        },
        {
            "_id": "id3LQXOnkx-Vus6-VnTJ-mvZD-5w6IllcB8Oba",
            "text": true,
            "v": "Nike"
        },
        {
            "_id": "id1zqTCUyD-TI9m-C9YN-SPUH-MbfbF0Aycc3o",
            "tag": "h5",
            "classes": [],
            "data": {},
            "children": [
                "id3LQXOnkx-Vus6-VnTJ-mvZD-5w6IllcB8Oba"
            ],
            "type": "Paragrpah"
        },
        {
            "_id": "id7h2frbd2-EzLM-oILS-3uL8-HjEJPIQuY0kc",
            "tag": "div",
            "classes": [
                "linestyle"
            ],
            "data": {},
            "children": [
                "id6CsOpy0E-fKVr-xFDB-yBg1-nplT3lMY6U0V",
                "idIHlqUMmf-rX3j-7k1o-RvLe-55ODqHyogg3P",
                "id1zqTCUyD-TI9m-C9YN-SPUH-MbfbF0Aycc3o"
            ],
            "type": "Container"
        },
        {
            "_id": "iduyRa2gXj-oszS-TP5o-613T-lVA5JqeP7Rqz",
            "text": true,
            "v": "2023-Now"
        },
        {
            "_id": "idTkxdynIV-R3t2-K6y6-IxSi-IyTMEwb8wqRx",
            "tag": "p",
            "classes": [],
            "data": {},
            "children": [
                "iduyRa2gXj-oszS-TP5o-613T-lVA5JqeP7Rqz"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idbu6Klhcj-JI74-1qSH-XMRy-cyZFIfUAznlb",
            "tag": "div",
            "classes": [
                "experience-date"
            ],
            "data": {},
            "children": [
                "idTkxdynIV-R3t2-K6y6-IxSi-IyTMEwb8wqRx"
            ],
            "type": "Container"
        },
        {
            "_id": "idxfMalrJj-pBbI-ECG5-u2Mu-zJypBUQq1D82",
            "tag": "div",
            "classes": [
                "experience-list"
            ],
            "data": {},
            "children": [
                "id7h2frbd2-EzLM-oILS-3uL8-HjEJPIQuY0kc",
                "idbu6Klhcj-JI74-1qSH-XMRy-cyZFIfUAznlb"
            ],
            "type": "Container"
        },
        {
            "_id": "idVrSxdnIW-1jPy-9HOR-51qH-LZOiUZYqcmdJ",
            "text": true,
            "v": "Associate Designer"
        },
        {
            "_id": "idvBBcXAIG-IuAz-QqCI-DtLG-mAguksq0ep0T",
            "tag": "h5",
            "classes": [],
            "data": {},
            "children": [
                "idVrSxdnIW-1jPy-9HOR-51qH-LZOiUZYqcmdJ"
            ],
            "type": "Paragrpah"
        },
        {
            "_id": "idmuEQvk9w-XBMl-wlYE-A6dq-byPgV84l7Yq5",
            "tag": "div",
            "classes": [
                "lineheight"
            ],
            "data": {},
            "children": [],
            "type": "Container"
        },
        {
            "_id": "ideoUxshzN-1mod-YTUf-EpGS-KlJseLN2GE9f",
            "text": true,
            "v": "Nike"
        },
        {
            "_id": "id9azPrAY4-qDN5-53D3-ZdKl-wU4RnFiipjUm",
            "tag": "h5",
            "classes": [],
            "data": {},
            "children": [
                "ideoUxshzN-1mod-YTUf-EpGS-KlJseLN2GE9f"
            ],
            "type": "Paragrpah"
        },
        {
            "_id": "idjG9dn8Mx-Sifx-ZP8J-x9Nz-7P2cxyTCUjjU",
            "tag": "div",
            "classes": [
                "linestyle"
            ],
            "data": {},
            "children": [
                "idvBBcXAIG-IuAz-QqCI-DtLG-mAguksq0ep0T",
                "idmuEQvk9w-XBMl-wlYE-A6dq-byPgV84l7Yq5",
                "id9azPrAY4-qDN5-53D3-ZdKl-wU4RnFiipjUm"
            ],
            "type": "Container"
        },
        {
            "_id": "idgpkIELrt-JVgP-iKZ5-VF7l-9yPdf9QpBNqO",
            "text": true,
            "v": "2023-Now"
        },
        {
            "_id": "idOOyWmQmu-oMCP-3qxb-RGxq-UAViahfo6fem",
            "tag": "p",
            "classes": [],
            "data": {},
            "children": [
                "idgpkIELrt-JVgP-iKZ5-VF7l-9yPdf9QpBNqO"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idnVINILd6-UBTS-9juu-HAKf-0Xc5B2Xy0YOl",
            "tag": "div",
            "classes": [
                "experience-date"
            ],
            "data": {},
            "children": [
                "idOOyWmQmu-oMCP-3qxb-RGxq-UAViahfo6fem"
            ],
            "type": "Container"
        },
        {
            "_id": "idREz1vo7w-80Q2-SLu0-QMN0-nM7fAUYDjRGO",
            "tag": "div",
            "classes": [
                "experience-list"
            ],
            "data": {},
            "children": [
                "idjG9dn8Mx-Sifx-ZP8J-x9Nz-7P2cxyTCUjjU",
                "idnVINILd6-UBTS-9juu-HAKf-0Xc5B2Xy0YOl"
            ],
            "type": "Container"
        },
        {
            "_id": "ide3pPLkRF-YApd-uETl-8iXp-36cIcfRa1uKh",
            "tag": "div",
            "classes": [],
            "data": {},
            "children": [
                "idfx3Enbit-hcNB-K9Aq-E2p0-A26VxyHC3b38",
                "idcsJl3G4f-N5GQ-L5AF-PsAk-A2ovIjzziy7G",
                "id5q6nTjn8-7wNK-tQaD-eddX-ZIdJnngqU98I",
                "idxfMalrJj-pBbI-ECG5-u2Mu-zJypBUQq1D82",
                "idREz1vo7w-80Q2-SLu0-QMN0-nM7fAUYDjRGO"
            ],
            "type": "Container"
        },
        {
            "_id": "idIEAehjRA-XxBL-jf6K-SbXd-IKldYZBkc1od",
            "tag": "div",
            "classes": [],
            "data": {},
            "children": [
                "idqvJaYhug-4cR7-ucvc-nSIu-kCtcVHHjSj0D",
                "idj9lIOGLq-iS23-8CNr-YTDp-cK0ja5F01DvR",
                "idDY9QqEaL-D3sV-jewX-akid-63ApdqDBetIl",
                "idNEGZKsJj-7g4p-IpEj-HelR-Eywb0ZmJBgAA",
                "ide3pPLkRF-YApd-uETl-8iXp-36cIcfRa1uKh"
            ],
            "type": "Container"
        },
        {
            "_id": "idvX5oc2kZ-VUlu-TdQf-Nrhs-VTiKDiDX3p0X",
            "tag": "div",
            "classes": [
                "about-service"
            ],
            "data": {},
            "children": [
                "idukhzV9GU-h2eG-uSIL-Mn1Z-7Wdk3wR5cn6M",
                "id7goYduvq-u9TS-8VwV-6Re1-vgVXRHaQVDAs",
                "idIEAehjRA-XxBL-jf6K-SbXd-IKldYZBkc1od"
            ],
            "type": "Container"
        },
        {
            "_id": "idyCSjgJqJ-zpGQ-Z09I-ClDe-x7XmGnGBoEE4",
            "text": true,
            "v": "LET'S CONNECT"
        },
        {
            "_id": "idwuNNy7nr-UIth-bchM-o2YO-JHl5IlNC0ugQ",
            "tag": "h1",
            "classes": [
                "connect"
            ],
            "data": {},
            "children": [
                "idyCSjgJqJ-zpGQ-Z09I-ClDe-x7XmGnGBoEE4"
            ],
            "type": "Heading 1"
        },
        {
            "_id": "idLe7UbCnO-JTMS-ruS4-9iBK-0kHe1N9sgT0r",
            "text": true,
            "v": "LinkedIn"
        },
        {
            "_id": "idWDwbgiYJ-ptkW-WgQH-ayko-a7ok8n0yrbFh",
            "tag": "p",
            "classes": [
                "social-list"
            ],
            "data": {},
            "children": [
                "idLe7UbCnO-JTMS-ruS4-9iBK-0kHe1N9sgT0r"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idmRU9D8sd-JbAX-Jnrz-YmCO-9otQgQO9UYiC",
            "tag": "img",
            "classes": [
                "arrow-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idWMaZI0yl-w5SM-FqyE-Pnjc-nLZ4rYfE0Lnn",
            "tag": "li",
            "classes": [
                "arrow"
            ],
            "data": {},
            "children": [
                "idWDwbgiYJ-ptkW-WgQH-ayko-a7ok8n0yrbFh",
                "idmRU9D8sd-JbAX-Jnrz-YmCO-9otQgQO9UYiC"
            ],
            "type": "List Item"
        },
        {
            "_id": "idOqNUCrh6-Srvg-lSDn-LJgh-B6W30f9leMFu",
            "text": true,
            "v": "Dribble"
        },
        {
            "_id": "iddyM9NThj-yYov-B0tF-cYBV-Mum9KX8RtjjI",
            "tag": "p",
            "classes": [
                "social-list"
            ],
            "data": {},
            "children": [
                "idOqNUCrh6-Srvg-lSDn-LJgh-B6W30f9leMFu"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idg7hrY9ka-56N3-76Ak-r9H4-M3YRFiD0ys8T",
            "tag": "img",
            "classes": [
                "arrow-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idswp7mTak-Gh96-lJmq-EDOj-aHKsJlB1u8LP",
            "tag": "li",
            "classes": [
                "arrow"
            ],
            "data": {},
            "children": [
                "iddyM9NThj-yYov-B0tF-cYBV-Mum9KX8RtjjI",
                "idg7hrY9ka-56N3-76Ak-r9H4-M3YRFiD0ys8T"
            ],
            "type": "List Item"
        },
        {
            "_id": "id4wlTG2vI-RUHc-q259-thEu-p0rPFBDGjgUa",
            "tag": "ul",
            "classes": [
                "socials"
            ],
            "data": {},
            "children": [
                "idWMaZI0yl-w5SM-FqyE-Pnjc-nLZ4rYfE0Lnn",
                "idswp7mTak-Gh96-lJmq-EDOj-aHKsJlB1u8LP"
            ],
            "type": "Unordered List"
        },
        {
            "_id": "idXNjwbDty-k1Z5-eFrv-pGNA-ddgO3hdtD24f",
            "text": true,
            "v": "Instagram"
        },
        {
            "_id": "idKcWrOWbT-XmXl-6HDu-byRG-4Vh0Lk25qm6H",
            "tag": "p",
            "classes": [
                "social-list"
            ],
            "data": {},
            "children": [
                "idXNjwbDty-k1Z5-eFrv-pGNA-ddgO3hdtD24f"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idmUTmaQyn-Fd8b-UhIu-CTf2-k2V5tg7oa2bZ",
            "tag": "img",
            "classes": [
                "arrow-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idR7Eh3X0a-bzy2-PRHU-K6iD-522Mjbyvn4WZ",
            "tag": "li",
            "classes": [
                "arrow"
            ],
            "data": {},
            "children": [
                "idKcWrOWbT-XmXl-6HDu-byRG-4Vh0Lk25qm6H",
                "idmUTmaQyn-Fd8b-UhIu-CTf2-k2V5tg7oa2bZ"
            ],
            "type": "List Item"
        },
        {
            "_id": "idgp5kxqFr-a2RK-CHMR-QsYx-jdUkV9l7Pp6P",
            "text": true,
            "v": "Twitter"
        },
        {
            "_id": "id9XvaAMie-OBc7-Xzss-TkQN-DGGf4x5rBzav",
            "tag": "p",
            "classes": [
                "social-list"
            ],
            "data": {},
            "children": [
                "idgp5kxqFr-a2RK-CHMR-QsYx-jdUkV9l7Pp6P"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idJRKXkKud-MsvH-ZgXK-OkKw-Zem8ol4q5Cqq",
            "tag": "img",
            "classes": [
                "arrow-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idFr9JFasr-FVoo-nvC0-WrEY-HlahhyGLC3OC",
            "tag": "li",
            "classes": [
                "arrow"
            ],
            "data": {},
            "children": [
                "id9XvaAMie-OBc7-Xzss-TkQN-DGGf4x5rBzav",
                "idJRKXkKud-MsvH-ZgXK-OkKw-Zem8ol4q5Cqq"
            ],
            "type": "List Item"
        },
        {
            "_id": "idM0Xd0SN9-oZN4-efXa-Tm4j-gXZGBs3mNEGE",
            "tag": "ul",
            "classes": [
                "socials"
            ],
            "data": {},
            "children": [
                "idR7Eh3X0a-bzy2-PRHU-K6iD-522Mjbyvn4WZ",
                "idFr9JFasr-FVoo-nvC0-WrEY-HlahhyGLC3OC"
            ],
            "type": "Unordered List"
        },
        {
            "_id": "idFwrvEyXf-CRVf-pJqA-XbGw-BeRZBGIZ9SJx",
            "tag": "div",
            "classes": [
                "social"
            ],
            "data": {},
            "children": [
                "id4wlTG2vI-RUHc-q259-thEu-p0rPFBDGjgUa",
                "idM0Xd0SN9-oZN4-efXa-Tm4j-gXZGBs3mNEGE"
            ],
            "type": "Container"
        },
        {
            "_id": "idPk0NRXMh-N1l2-SC3b-ve94-wClJn8oK3Fo5",
            "tag": "hr",
            "classes": [],
            "data": {},
            "children": []
        },
        {
            "_id": "id6ph2esrx-cNpL-Ibfu-X0jM-O8KRs6VPEhgq",
            "text": true,
            "v": "© 2024 Kiara Jones"
        },
        {
            "_id": "ida3cw0y5g-cZZe-ebEi-sliH-yOX44KWBTfiF",
            "tag": "p",
            "classes": [
                "footer"
            ],
            "data": {},
            "children": [
                "id6ph2esrx-cNpL-Ibfu-X0jM-O8KRs6VPEhgq"
            ],
            "type": "Paragraph"
        }
    ],
    "styles":{
        "data": {
            "appliedStylesMap": {},
            "breakpoints": {
            }, 
            "macros": [], "migrations": {"stylesNext": true}, "swatches": []
        },
        "style":[
            {
                "style_id": "a3ef9797-d311-476e-889a-24603baf60ea",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "*, ::before, ::after",
                    "sel": "*, ::before, ::after",
                    "styleLess": "box-sizing: border-box;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "bca187ff-1d16-408c-a56d-d44c25170965",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "html, body",
                    "sel": "html, body",
                    "styleLess": "font-family: inter; height: 100%; padding: 0px; max-width: 1600px; margin: auto;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "77629298-0a80-40b9-aedf-6f2a51f8dfac",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "body",
                    "sel": "body",
                    "styleLess": "line-height: 1.5; -webkit-font-smoothing: antialiased; font-family: Poppins, sans-serif;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "3f07eb64-a033-4917-9115-7999c7cf7167",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "img",
                    "sel": "img",
                    "styleLess": "display: block;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "723b0618-6954-4009-8482-e7f43f998640",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "ul",
                    "sel": "ul",
                    "styleLess": "list-style: none; padding: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "926e2c7d-7b9a-4fa3-b69d-c91d73180ef5",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "a",
                    "sel": "a",
                    "styleLess": "text-decoration: none; color: black;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "9f44673a-8c50-41c3-bb08-7c9da605db8e",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "p, h1, h2, h3, h4, h5, h6",
                    "sel": "p, h1, h2, h3, h4, h5, h6",
                    "styleLess": "overflow-wrap: break-word; margin: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "24a55142-f0a0-4f59-a27c-036e7afc6401",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "#main",
                    "sel": "#main",
                    "styleLess": "padding: 2em 1em;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "c05a24a4-63b0-4581-9f7d-dbc7749d20c1",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".nav_bio",
                    "styleLess": "display: flex; flex-direction: column; gap: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "8b76c595-94d7-40f8-ae7c-0a195c89a52a",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product-designer",
                    "styleLess": "display: flex; align-items: center; gap: 10px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "f128aaa8-2f8c-4432-bb01-df2c7d745126",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product-image",
                    "styleLess": "width: 45px; height: 45px; padding-top: 5px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "e2879e7b-ad9f-4aa2-b6d5-8c3690898c06",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".designer",
                    "styleLess": "color: rgb(152, 162, 179); font-size: 13px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "851d44c9-bfdb-484c-882b-366bc80d8a4a",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".header",
                    "styleLess": "display: flex; justify-content: space-between; gap: 20px; padding-bottom: 1em;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".header",
                            "styleLess": "display: flex; gap: 40px; padding-right: 30px;"
                        }
                    }
                }
            },
            {
                "style_id": "1ba6a980-e1ef-40a4-9452-5a2aa8e65f02",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".header-list",
                    "styleLess": "display: none;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "a3a690f6-e57e-4722-bc25-7be742b95b8d",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".menu-icon",
                    "styleLess": "width: 40px; height: 40px;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".menu-icon",
                            "styleLess": "display: none;"
                        }
                    }
                }
            },
            {
                "style_id": "cf600a66-bf56-4f67-b004-47501e8e0224",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product-head",
                    "styleLess": "font-size: 1.8em; width: 90%; line-height: 1.5em;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".product-head",
                            "styleLess": "font-size: 36px;"
                        }
                    }
                }
            },
            {
                "style_id": "e7772f31-e21c-439a-8db4-bd4174fd60ad",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "p",
                    "sel": "p",
                    "styleLess": "font-size: 15px; line-height: 30px; color: rgb(52, 64, 84);",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "89d49b0e-47de-4d45-bca7-9afd53c0cc6a",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product_UK-img",
                    "styleLess": "width: 95%; height: 500px; padding: 0px; overflow: hidden;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "0a4a8762-a630-495d-a3cc-0472d387ddeb",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".design-image",
                    "styleLess": "width: 100%; height: 100%; object-fit: cover; object-position: center center;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".design-image",
                            "styleLess": "width: 100%; height: 100%; padding-bottom: 40px;"
                        },
                        "medium": {
                            "sel": ".design-image",
                            "styleLess": "width: 100%; height: 100%;"
                        }
                    }
                }
            },
            {
                "style_id": "79917271-45da-44bb-878e-0bddb628ba34",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".header_hr",
                    "styleLess": "margin-top: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "ad6185a3-b0a5-482c-891e-88c07609ec12",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "hr",
                    "sel": "hr",
                    "styleLess": "margin: 2em 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "fba43476-eefd-43ed-9cc1-5c0025ef9c7a",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".work-image",
                    "styleLess": "width: 100%; height: 150%;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".work-image",
                            "styleLess": "width: 90%; height: 110%;"
                        },
                        "medium": {
                            "sel": ".work-image",
                            "styleLess": "width: 100%; height: 100%;"
                        }
                    }
                }
            },
            {
                "style_id": "2d2c29cf-2104-4f00-9623-eca7e34275cf",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product-title",
                    "styleLess": "margin: 0px; font-size: 20px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "6ddf1745-833e-46e9-87f3-5a146ef2052a",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".work",
                    "styleLess": "padding-bottom: 40px;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".work",
                            "styleLess": "padding-left: 20px;"
                        },
                        "medium": {
                            "sel": ".work",
                            "styleLess": "margin-bottom: 30px;"
                        }
                    }
                }
            },
            {
                "style_id": "ffbadff1-72bf-4707-99f6-4ca19fb07dc2",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product-role",
                    "styleLess": "margin: 3px 0px; font-size: 13px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "92aeb19d-ad34-4ae2-a109-1b3072b82c79",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".about-image",
                    "styleLess": "width: 100%;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".about-image",
                            "styleLess": "width: 650px; height: 650px;"
                        },
                        "medium": {
                            "sel": ".about-image",
                            "styleLess": "width: 450px; height: 350px;"
                        }
                    }
                }
            },
            {
                "style_id": "21d70915-711a-464c-bc87-566e25825146",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".services",
                    "styleLess": "display: flex; gap: 60px;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".services",
                            "styleLess": "gap: 0px; margin-left: 10px; flex-direction: column; margin-bottom: 0px;"
                        }
                    }
                }
            },
            {
                "style_id": "faf60e03-97eb-43de-a509-c9bcbe760823",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".service-list",
                    "styleLess": "font-size: 13px; margin: 12px;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".service-list",
                            "styleLess": "margin-left: 0px;"
                        }
                    }
                }
            },
            {
                "style_id": "05ed014a-30da-4128-b4e9-1d5c0a82f8df",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".works",
                    "styleLess": "padding: 3px 10px; background-color: rgb(254, 228, 226); margin-top: 40px; margin-bottom: 20px; font-weight: 400; font-size: 13px; border-radius: 40px; width: 60px; text-align: center;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".works",
                            "styleLess": "margin-left: 50px;"
                        }
                    }
                }
            },
            {
                "style_id": "9617d0da-e35b-45cc-a910-b9b7666edabd",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".about",
                    "styleLess": "padding: 4px 10px; background-color: rgb(234, 236, 245); margin-top: 40px; font-weight: 400; margin-bottom: 10px; font-size: 13px; border-radius: 40px; width: 60px; text-align: center;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".about",
                            "styleLess": "width: 12%; margin-top: 8px;"
                        }
                    }
                }
            },
            {
                "style_id": "a7b40498-1c1c-4943-91e1-356aec048fc5",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".break",
                    "styleLess": "word-break: break-word;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "7eee56f8-b0f4-4e04-a4f5-a92b659d3ce1",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".service",
                    "styleLess": "padding: 4px 11px; background-color: rgb(254, 240, 199); font-weight: 400; margin-top: 20px; font-size: 13px; border-radius: 40px; width: 70px; text-align: center;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".service",
                            "styleLess": "margin-left: 0px; width: 33%;"
                        }
                    }
                }
            },
            {
                "style_id": "33d9d92f-d2ad-430f-9f3c-612521a0fa68",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".experience",
                    "styleLess": "padding: 4px 11px; font-weight: 400; margin-bottom: 20px; font-size: 13px; border-radius: 40px; background-color: rgb(209, 250, 223); width: 95px; text-align: center;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".experience",
                            "styleLess": "margin-left: 0px; width: 45%;"
                        }
                    }
                }
            },
            {
                "style_id": "be3d167d-e8fe-48eb-892c-71f95d137ffc",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".lineheight",
                    "styleLess": "width: 20px; height: 1.5px; margin-top: 10px; background-color: rgb(152, 162, 179);",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "948eaa22-c5c3-45c9-a24a-173563c9407b",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".linestyle",
                    "styleLess": "display: flex; gap: 5px; padding: 0px; margin: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "fb4d6ec4-9182-41d1-ba9b-3b603b72c174",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".about-section",
                    "styleLess": "display: flex; flex-direction: column; gap: 1.5em;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".about-section",
                            "styleLess": "width: 500px;"
                        }
                    }
                }
            },
            {
                "style_id": "10c2bc80-5208-4c1f-a533-dbf59e1e3bed",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".experience-date",
                    "styleLess": "margin-top: 1em; width: 90px; height: 35px; font-size: 12px; border: 1px solid rgb(0, 0, 0); border-radius: 40px; text-align: center;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "fa17640f-396d-4080-9094-0174561fe954",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".vertical",
                    "styleLess": "display: none; height: 1px; width: 340px; background-color: rgb(152, 162, 179); padding-right: 50px; margin-bottom: 40px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "02315d29-d423-479b-9069-625a08a1504d",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".experience-list",
                    "styleLess": "margin: 0px 0px 20px;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".experience-list",
                            "styleLess": "margin-bottom: 50px; margin-left: 15px;"
                        }
                    }
                }
            },
            {
                "style_id": "d5a26303-10df-48f0-96c7-6d48f2c568d0",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".connect",
                    "styleLess": "font-size: 45px; font-weight: 400; padding: 30px 0px;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".connect",
                            "styleLess": "font-size: 87px;"
                        },
                        "medium": {
                            "sel": ".connect",
                            "styleLess": "font-size: 140px;"
                        }
                    }
                }
            },
            {
                "style_id": "690be443-3254-428d-9931-233ced5fa2bc",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product-note",
                    "styleLess": "display: flex; flex-direction: column; gap: 1.2em; margin-bottom: 1.2em;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".product-note",
                            "styleLess": "width: 70%; justify-content: center; margin-top: 7em;"
                        }
                    }
                }
            },
            {
                "style_id": "bafb7513-be3e-4f21-ba2b-729cf561a33c",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".arrow",
                    "styleLess": "display: flex; justify-content: space-around; align-items: center; font-weight: 600; font-size: 15px; gap: 10px; border: 1px solid; width: 150px; height: 40px; border-radius: 40px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "17259aa7-e9a2-4a8f-9422-d8d736163d84",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".arrow-image",
                    "styleLess": "width: 20px; height: 20px; margin-top: 6px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "261fc9af-f1f2-4d96-8209-45662b7e9648",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".social-list",
                    "styleLess": "margin-top: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "12a6039b-dbc5-4cb8-95e2-5f77652efc4c",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".socials",
                    "styleLess": "display: flex; justify-content: center; gap: 40px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "4ea23d59-47ce-4634-b228-4dd4014b1f40",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".social",
                    "styleLess": "background-color: rgb(255, 247, 245); margin: 0px 0px 30px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "8e669159-7e75-403d-99cd-57891ed482d9",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".footer",
                    "styleLess": "text-align: center;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".footer",
                            "styleLess": "text-align: left;"
                        }
                    }
                }
            },
            {
                "style_id": "94426584-602d-4e30-9cbb-0774b52019c7",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "html body",
                    "sel": "html body",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": "html body",
                            "styleLess": "margin-left: 30px;"
                        }
                    }
                }
            },
            {
                "style_id": "48118a7b-a685-4dad-9a28-848bba5cff5d",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": ".ellipse",
                    "sel": ".ellipse",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".ellipse",
                            "styleLess": "width: 8px; height: 8px; border-radius: 5px; background-color: rgb(3, 152, 85); margin-top: 7px;"
                        }
                    }
                }
            },
            {
                "style_id": "cbe1440d-a3e1-47ef-a159-ea9f08bdc59c",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": ".available-freelance",
                    "sel": ".available-freelance",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".available-freelance",
                            "styleLess": "display: flex; padding: 0px 10px; gap: 7px; height: 25px; border-radius: 12px; background-color: rgb(242, 244, 247);"
                        }
                    }
                }
            },
            {
                "style_id": "2c2f644a-3e58-4993-b9e3-c5aa88360930",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": ".product-uk",
                    "sel": ".product-uk",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".product-uk",
                            "styleLess": "display: flex; width: 100%; gap: 50px;"
                        }
                    }
                }
            },
            {
                "style_id": "9ee02f79-3b6b-4ae1-a6b1-066a0aba2ce3",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": ".work-section",
                    "sel": ".work-section",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".work-section",
                            "styleLess": "display: flex; gap: 10px; margin-bottom: 40px;"
                        }
                    }
                }
            },
            {
                "style_id": "6cbb82fd-c3d9-494d-9800-cc702dda845c",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": ".about-service",
                    "sel": ".about-service",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".about-service",
                            "styleLess": "display: flex; padding-left: 50px; gap: 26px;"
                        }
                    }
                }
            },
            {
                "style_id": "62c3ba17-1563-44cc-b124-ec7b3c943c50",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": ".horizontal",
                    "sel": ".horizontal",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".horizontal",
                            "styleLess": "margin-left: 0px; width: 1px; height: 730px; background-color: rgb(152, 162, 179);"
                        }
                    }
                }
            },
            {
                "style_id": "56f3e512-2d2b-4576-8632-03c593133e33",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": ".service-service",
                    "sel": ".service-service",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".service-service",
                            "styleLess": "margin: 0px;"
                        }
                    }
                }
            }
        ]
    }
}


const spear = {
    "route": "/spear.html",
    "name": "work page",
    "head": {
        "title": "About",
        "description": "This is the work page for porfolio-3"
    },
    "slug": "idbNci57if-mdNK-9cCn",
    "page_id": "idbNci57if-mdNK-9cCn-qfBm-E5kdXE5TkBNw",
    "nodes": [
        {
            "_id": "id6OMmWllJ-UaN1-SsKN-o8IA-abUAXH57gkSf",
            "tag": "main",
            "classes": [],
            "data": {},
            "children": [
                "idizJeueo2-fHdn-Yopp-TwKP-Ok0Xh8FFgkHk",
                "id9hCvkOxx-42RM-2FHj-L2q6-mdyveGP8g9BK",
                "idqudEZKau-lM3S-XDDN-WevE-Pvocj40PKGZl",
                "idJMWY4Z2k-gBWA-GZlc-dYmE-r0VCU1fYOBLT",
                "idkRSCkRp6-DeKO-oxUV-8xrz-C0pUlziZSh7L",
                "idgtGxpYTa-gglY-0HbK-MPCZ-YGvuxDnh6B5o",
                "id03snPpwK-UiBP-1sXA-0KVe-R116s4LVbqgP",
                "idEE5ZE3OV-K3Wd-ahGG-L600-Z5e2Xk7VPpaQ",
                "idWtYBSNRG-KdM6-N7WP-8w7p-yhmwS8ZzZFo3",
                "idobwnXAsI-OdTc-fxEx-rPOA-UVxOcBnBY2z8",
                "id8kCpwYjS-YLnE-tSJB-7hym-9GH5EA9RWNjL"
            ],
            "type": "Main"
        },
        {
            "_id": "idX5b2dCxB-4McG-LN4e-2ozK-CtXI1HRXq8dF",
            "tag": "img",
            "classes": [
                "product-image"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709544146469-Ellipse%20151.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idH0To3wPA-yjZd-KxQJ-xVxP-5zBNzFB8T2Q0",
            "tag": "div",
            "classes": [],
            "data": {},
            "children": [
                "idX5b2dCxB-4McG-LN4e-2ozK-CtXI1HRXq8dF"
            ],
            "type": "Container"
        },
        {
            "_id": "idycbMOst1-RzEe-2y4D-pnZq-YmJ9aD7yXaHU",
            "text": true,
            "v": "Kiara Jones"
        },
        {
            "_id": "idCYyK9uqi-bQuq-uOKT-WMPL-eEv6qdnEtRjg",
            "tag": "h4",
            "classes": [
                "product-name"
            ],
            "data": {},
            "children": [
                "idycbMOst1-RzEe-2y4D-pnZq-YmJ9aD7yXaHU"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idndGQjVE5-MnRP-3bOi-VHwK-yZwiUUia8xkH",
            "text": true,
            "v": "Product Designer"
        },
        {
            "_id": "idUsjV2IpT-kIti-tb07-OIbj-UGDFSrhR77sb",
            "tag": "h4",
            "classes": [
                "designer"
            ],
            "data": {},
            "children": [
                "idndGQjVE5-MnRP-3bOi-VHwK-yZwiUUia8xkH"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "id7ChrYIzm-XwTi-O6gV-sTVe-ajrNDsS2vwP9",
            "tag": "div",
            "classes": [
                "nav_bio"
            ],
            "data": {},
            "children": [
                "idCYyK9uqi-bQuq-uOKT-WMPL-eEv6qdnEtRjg",
                "idUsjV2IpT-kIti-tb07-OIbj-UGDFSrhR77sb"
            ],
            "type": "Container"
        },
        {
            "_id": "id7VCdvbpp-Z88w-aa0C-xXul-hr9zI2pAFXYW",
            "tag": "li",
            "classes": [
                "product-designer"
            ],
            "data": {},
            "children": [
                "idH0To3wPA-yjZd-KxQJ-xVxP-5zBNzFB8T2Q0",
                "id7ChrYIzm-XwTi-O6gV-sTVe-ajrNDsS2vwP9"
            ],
            "type": "Link"
        },
        {
            "_id": "idRpI82waO-7MxG-XoAW-TOvS-2AwTPJd5Opkn",
            "tag": "ul",
            "classes": [],
            "data": {},
            "children": [
                "id7VCdvbpp-Z88w-aa0C-xXul-hr9zI2pAFXYW"
            ],
            "type": "Unordered List"
        },
        {
            "_id": "idvil82ZxL-eo4S-MXbW-0l1z-FjRHMkiXR93a",
            "text": true,
            "v": "Work"
        },
        {
            "_id": "idCnX86BZb-DSLG-EcdW-o8Kh-bMgSlSqtgqCm",
            "tag": "a",
            "classes": [
                "header-icons"
            ],
            "data": {
                "href": "#work"
            },
            "children": [
                "idvil82ZxL-eo4S-MXbW-0l1z-FjRHMkiXR93a"
            ]
        },
        {
            "_id": "idmUsQ5tD3-EOyh-BiOF-1wqp-SiXSUJR9HxBH",
            "tag": "li",
            "classes": [],
            "data": {},
            "children": [
                "idCnX86BZb-DSLG-EcdW-o8Kh-bMgSlSqtgqCm"
            ],
            "type": "Link"
        },
        {
            "_id": "idkUTJoKf2-qud3-XSlA-cuQt-CtfzuzvKhk2m",
            "text": true,
            "v": "About"
        },
        {
            "_id": "id3wGIyjiV-CaEo-O3zX-7zn2-wnsUu0k6XU4E",
            "tag": "a",
            "classes": [
                "header-icons"
            ],
            "data": {
                "href": "./index.html"
            },
            "children": [
                "idkUTJoKf2-qud3-XSlA-cuQt-CtfzuzvKhk2m"
            ]
        },
        {
            "_id": "idBTiTM9Hn-b18Z-wWih-j6bz-ewJEq2DdqGrj",
            "tag": "li",
            "classes": [],
            "data": {},
            "children": [
                "id3wGIyjiV-CaEo-O3zX-7zn2-wnsUu0k6XU4E"
            ],
            "type": "Link"
        },
        {
            "_id": "idTfmgiDWM-KEUX-Y85q-0u68-4qVwX0kDfhI6",
            "text": true,
            "v": "Contact"
        },
        {
            "_id": "idmDX4SjHy-lV4n-y3Fo-tiWj-0skZZ3GM8KC2",
            "tag": "a",
            "classes": [
                "header-icons"
            ],
            "data": {
                "href": "Contact"
            },
            "children": [
                "idTfmgiDWM-KEUX-Y85q-0u68-4qVwX0kDfhI6"
            ]
        },
        {
            "_id": "idfcCQlH1y-oK3b-sSQ6-Ql3j-ovOBIOH0o1qN",
            "tag": "li",
            "classes": [],
            "data": {},
            "children": [
                "idmDX4SjHy-lV4n-y3Fo-tiWj-0skZZ3GM8KC2"
            ],
            "type": "Link"
        },
        {
            "_id": "idLTVXBNLy-f1DZ-M0is-rotV-Alx14hcXCiY8",
            "tag": "ul",
            "classes": [
                "header",
                "header-list"
            ],
            "data": {},
            "children": [
                "idmUsQ5tD3-EOyh-BiOF-1wqp-SiXSUJR9HxBH",
                "idBTiTM9Hn-b18Z-wWih-j6bz-ewJEq2DdqGrj",
                "idfcCQlH1y-oK3b-sSQ6-Ql3j-ovOBIOH0o1qN"
            ],
            "type": "Unordered List"
        },
        {
            "_id": "idP4mnsLaX-KFS3-QcT7-xyT2-pNjQn4ifa2wY",
            "tag": "div",
            "classes": [
                "ellipse"
            ],
            "data": {},
            "children": [],
            "type": "Container"
        },
        {
            "_id": "idoJCGaWgv-geNh-2Fsg-FBAx-Q713tv20EXEl",
            "text": true,
            "v": "Available for freelance"
        },
        {
            "_id": "idZcXkoxFs-2yTd-Tthx-JOl2-cjK4mQicdrsd",
            "tag": "a",
            "classes": [
                "freelance"
            ],
            "data": {
                "href": "Available for freelance"
            },
            "children": [
                "idoJCGaWgv-geNh-2Fsg-FBAx-Q713tv20EXEl"
            ]
        },
        {
            "_id": "idaIdlvcGF-KGY6-kB5J-K2nQ-EhyQqyT7XF1x",
            "tag": "li",
            "classes": [],
            "data": {},
            "children": [
                "idZcXkoxFs-2yTd-Tthx-JOl2-cjK4mQicdrsd"
            ],
            "type": "Link"
        },
        {
            "_id": "id0TNKheR1-w7vw-U0WS-Vv2D-48lsyHK8whO1",
            "tag": "ul",
            "classes": [
                "available-freelance",
                "header-list"
            ],
            "data": {},
            "children": [
                "idP4mnsLaX-KFS3-QcT7-xyT2-pNjQn4ifa2wY",
                "idaIdlvcGF-KGY6-kB5J-K2nQ-EhyQqyT7XF1x"
            ],
            "type": "Unordered List"
        },
        {
            "_id": "idthuOZ7HT-VWwt-qVaQ-oVsj-3V1DnTbGXSgv",
            "tag": "img",
            "classes": [
                "menu-icon"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709418812514-Menu%20Icon.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idSkHXkZNy-0cRX-6O4f-AbPl-jpXwtkvam95K",
            "tag": "div",
            "classes": [],
            "data": {},
            "children": [
                "idthuOZ7HT-VWwt-qVaQ-oVsj-3V1DnTbGXSgv"
            ],
            "type": "Container"
        },
        {
            "_id": "idLFz1MnR4-mBqZ-uOEx-z2fU-0u965R5XKmMk",
            "tag": "nav",
            "classes": [
                "header"
            ],
            "data": {},
            "children": [
                "idRpI82waO-7MxG-XoAW-TOvS-2AwTPJd5Opkn",
                "idLTVXBNLy-f1DZ-M0is-rotV-Alx14hcXCiY8",
                "id0TNKheR1-w7vw-U0WS-Vv2D-48lsyHK8whO1",
                "idSkHXkZNy-0cRX-6O4f-AbPl-jpXwtkvam95K"
            ]
        },
        {
            "_id": "idWbY7xF5q-U1R0-yXVQ-go5v-Rjc6ZrT5kn6n",
            "tag": "header",
            "classes": [],
            "data": {},
            "children": [
                "idLFz1MnR4-mBqZ-uOEx-z2fU-0u965R5XKmMk"
            ],
            "type": "Heading"
        },
        {
            "_id": "idBH2nqk3N-KAxh-13Dp-RZdS-pOveJGcryobq",
            "tag": "hr",
            "classes": [
                "header_hr"
            ],
            "data": {},
            "children": [],
            "type": "Horizontal Line"
        },
        {
            "_id": "idizJeueo2-fHdn-Yopp-TwKP-Ok0Xh8FFgkHk",
            "tag": "div",
            "classes": [],
            "data": {},
            "children": [
                "idWbY7xF5q-U1R0-yXVQ-go5v-Rjc6ZrT5kn6n",
                "idBH2nqk3N-KAxh-13Dp-RZdS-pOveJGcryobq"
            ],
            "type": "Container"
        },
        {
            "_id": "idA6KQmafO-U7MP-ROTz-DQdS-LNNcN7iOcEOX",
            "text": true,
            "v": "Spear Application"
        },
        {
            "_id": "id9hCvkOxx-42RM-2FHj-L2q6-mdyveGP8g9BK",
            "tag": "h1",
            "classes": [
                "spear-application"
            ],
            "data": {},
            "children": [
                "idA6KQmafO-U7MP-ROTz-DQdS-LNNcN7iOcEOX"
            ],
            "type": "Heading 1"
        },
        {
            "_id": "idqudEZKau-lM3S-XDDN-WevE-Pvocj40PKGZl",
            "tag": "hr",
            "classes": [
                "horizontal-line"
            ],
            "data": {},
            "children": [],
            "type": "Horizontal Line"
        },
        {
            "_id": "idr3LypUCY-NfHZ-Ekcc-pZqV-ayVS04aQzB2E",
            "text": true,
            "v": "Client:"
        },
        {
            "_id": "idAKrWSlvu-YwKe-9Bwc-ZGLT-5LaXJrfKsSSd",
            "tag": "p",
            "classes": [
                "client-service"
            ],
            "data": {},
            "children": [
                "idr3LypUCY-NfHZ-Ekcc-pZqV-ayVS04aQzB2E"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idvrsmLOiZ-hfjd-simJ-EIJe-HgVt1NgbEu32",
            "text": true,
            "v": "Ten Studios"
        },
        {
            "_id": "idmkzFdRcT-9Qr7-R7LZ-hYeB-fpzWHLRkpH1U",
            "tag": "b",
            "classes": [],
            "data": {},
            "children": [
                "idvrsmLOiZ-hfjd-simJ-EIJe-HgVt1NgbEu32"
            ]
        },
        {
            "_id": "idmqmy0asp-6PFn-Ofp0-VqPj-RcsgKsx3e61e",
            "tag": "p",
            "classes": [
                "client-design"
            ],
            "data": {},
            "children": [
                "idmkzFdRcT-9Qr7-R7LZ-hYeB-fpzWHLRkpH1U"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "id7gkYmZi0-XYRj-jYS4-mXEJ-nDNQifU7AuGk",
            "tag": "div",
            "classes": [
                "client"
            ],
            "data": {},
            "children": [
                "idAKrWSlvu-YwKe-9Bwc-ZGLT-5LaXJrfKsSSd",
                "idmqmy0asp-6PFn-Ofp0-VqPj-RcsgKsx3e61e"
            ],
            "type": "Container"
        },
        {
            "_id": "idv7OS36qI-MlSy-y7sk-cblH-X5LO4kH8SB3t",
            "text": true,
            "v": "Service:"
        },
        {
            "_id": "idHdKt0Olg-fvs9-qYdL-h2pg-3xP7j4RYmCXR",
            "tag": "p",
            "classes": [
                "client-service"
            ],
            "data": {},
            "children": [
                "idv7OS36qI-MlSy-y7sk-cblH-X5LO4kH8SB3t"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "id7DFVqqJk-lbB5-E5zs-w5CY-s7H6aS4FCzrU",
            "text": true,
            "v": "UI/UX Design"
        },
        {
            "_id": "idweNMrzD2-JhNe-R3ej-OBSd-52awmHixuZEP",
            "tag": "b",
            "classes": [],
            "data": {},
            "children": [
                "id7DFVqqJk-lbB5-E5zs-w5CY-s7H6aS4FCzrU"
            ]
        },
        {
            "_id": "iduZQH7jAl-1NfO-dZKc-Ec6e-k1rhu3LaVi0C",
            "tag": "p",
            "classes": [
                "client-design"
            ],
            "data": {},
            "children": [
                "idweNMrzD2-JhNe-R3ej-OBSd-52awmHixuZEP"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idcx9jED6F-zgRk-t5WV-wt6X-fbB6YRkzBW8Z",
            "tag": "div",
            "classes": [
                "client"
            ],
            "data": {},
            "children": [
                "idHdKt0Olg-fvs9-qYdL-h2pg-3xP7j4RYmCXR",
                "iduZQH7jAl-1NfO-dZKc-Ec6e-k1rhu3LaVi0C"
            ],
            "type": "Container"
        },
        {
            "_id": "idJMWY4Z2k-gBWA-GZlc-dYmE-r0VCU1fYOBLT",
            "tag": "div",
            "classes": [
                "servicee"
            ],
            "data": {},
            "children": [
                "id7gkYmZi0-XYRj-jYS4-mXEJ-nDNQifU7AuGk",
                "idcx9jED6F-zgRk-t5WV-wt6X-fbB6YRkzBW8Z"
            ],
            "type": "Container"
        },
        {
            "_id": "idNhQQq6x7-E7G7-ZSRP-drAF-ioO9rwEMAilx",
            "text": true,
            "v": "(2023)"
        },
        {
            "_id": "id6q0HcTjP-QWtE-bDmV-9eLT-bEFuNPujh64n",
            "tag": "h4",
            "classes": [],
            "data": {},
            "children": [
                "idNhQQq6x7-E7G7-ZSRP-drAF-ioO9rwEMAilx"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "ido841JCRt-g7DH-WmO8-e9eB-GBC1vObOcCc5",
            "text": true,
            "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in"
        },
        {
            "_id": "idt3u8jgxb-wGQ5-3c1o-eWGf-PnG9KagPvZ3S",
            "tag": "br",
            "classes": [],
            "data": {},
            "children": []
        },
        {
            "_id": "id38K9IKkK-xaWu-njRz-E66D-VOlz6VAKqVnb",
            "text": true,
            "v": "porttitor\n          egestas amet. Cum et feugiat porta pretium."
        },
        {
            "_id": "idlOLmI1uC-yrGV-JEQd-6jsB-CbYs5nZOWtAd",
            "tag": "br",
            "classes": [],
            "data": {},
            "children": []
        },
        {
            "_id": "idWkbwtaqb-npN3-04bd-D6zf-rJxXUGvEjwkg",
            "text": true,
            "v": "Suscipit et tempus\n          montes senectus."
        },
        {
            "_id": "id031zSH2l-wGq9-L7ZR-5jTN-JM3WR49SLsbx",
            "tag": "p",
            "classes": [
                "project-note"
            ],
            "data": {},
            "children": [
                "ido841JCRt-g7DH-WmO8-e9eB-GBC1vObOcCc5",
                "idt3u8jgxb-wGQ5-3c1o-eWGf-PnG9KagPvZ3S",
                "id38K9IKkK-xaWu-njRz-E66D-VOlz6VAKqVnb",
                "idlOLmI1uC-yrGV-JEQd-6jsB-CbYs5nZOWtAd",
                "idWkbwtaqb-npN3-04bd-D6zf-rJxXUGvEjwkg"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idynRr5irE-jsYR-9Vrt-aO4I-NTNaUGudnLNU",
            "text": true,
            "v": "Visit Live Project"
        },
        {
            "_id": "idHWQnafUs-PKTH-Us7O-W4ho-CUvO5qAEFpnY",
            "tag": "h4",
            "classes": [
                "live-project"
            ],
            "data": {},
            "children": [
                "idynRr5irE-jsYR-9Vrt-aO4I-NTNaUGudnLNU"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idkRSCkRp6-DeKO-oxUV-8xrz-C0pUlziZSh7L",
            "tag": "div",
            "classes": [
                "application"
            ],
            "data": {},
            "children": [
                "id6q0HcTjP-QWtE-bDmV-9eLT-bEFuNPujh64n",
                "id031zSH2l-wGq9-L7ZR-5jTN-JM3WR49SLsbx",
                "idHWQnafUs-PKTH-Us7O-W4ho-CUvO5qAEFpnY"
            ],
            "type": "Container"
        },
        {
            "_id": "idxR5hocyB-uJlt-FmDp-KS16-0JeT4tDjxMCw",
            "text": true,
            "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor egestas\n        amet. Cum et feugiat porta pretium. Suscipit et tempus montes senectus."
        },
        {
            "_id": "idgtGxpYTa-gglY-0HbK-MPCZ-YGvuxDnh6B5o",
            "tag": "p",
            "classes": [
                "note-two"
            ],
            "data": {},
            "children": [
                "idxR5hocyB-uJlt-FmDp-KS16-0JeT4tDjxMCw"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idPw5w2crh-LA5w-vQJv-yCS8-Rddrl5p2Sppb",
            "tag": "img",
            "classes": [
                "full-screen"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709806964231-Rectangle%20532.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "id03snPpwK-UiBP-1sXA-0KVe-R116s4LVbqgP",
            "tag": "div",
            "classes": [],
            "data": {},
            "children": [
                "idPw5w2crh-LA5w-vQJv-yCS8-Rddrl5p2Sppb"
            ],
            "type": "Container"
        },
        {
            "_id": "idIGoOlFg3-w3SB-w1d3-uZXn-kYt89ceAiYcC",
            "text": true,
            "v": "Concept"
        },
        {
            "_id": "idy3cnyqsF-Ba6c-5en7-MdMt-sftak6nzH1zF",
            "tag": "h3",
            "classes": [
                "concepts"
            ],
            "data": {},
            "children": [
                "idIGoOlFg3-w3SB-w1d3-uZXn-kYt89ceAiYcC"
            ],
            "type": "Heading 3"
        },
        {
            "_id": "idEVEyIByV-cIfi-5tSL-vThL-IlwuISYtO06d",
            "text": true,
            "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor egestas\n          amet. Cum et feugiat porta pretium. Suscipit et tempus montes\n          senectus. Lorem ipsum dolor sit amet consectetur. Quam eget in\n          porttitor egestas amet. Cum et feugiat porta pretium. Suscipit et\n          tempus montes senectus. Lorem ipsum dolor sit amet consectetur. Quam\n          eget in porttitor egestas amet."
        },
        {
            "_id": "id5ozAKPYO-bKib-tkXp-Msfq-WiVl0sGMb4Ds",
            "tag": "p",
            "classes": [
                "note-three"
            ],
            "data": {},
            "children": [
                "idEVEyIByV-cIfi-5tSL-vThL-IlwuISYtO06d"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idEE5ZE3OV-K3Wd-ahGG-L600-Z5e2Xk7VPpaQ",
            "tag": "div",
            "classes": [
                "concept"
            ],
            "data": {},
            "children": [
                "idy3cnyqsF-Ba6c-5en7-MdMt-sftak6nzH1zF",
                "id5ozAKPYO-bKib-tkXp-Msfq-WiVl0sGMb4Ds"
            ],
            "type": "Container"
        },
        {
            "_id": "idGm5eDBp2-Or7F-dlCH-ptDl-Ok0uWjsIrppZ",
            "tag": "img",
            "classes": [
                "full-screen"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709807993676-Rectangle%20533.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idPn6pJB3f-KMHz-PVnM-OUJV-dM5mfXokyPZn",
            "tag": "img",
            "classes": [
                "full-screen"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709808051635-Rectangle%20534.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idRUNhM2NY-tcm1-bXEF-ezGu-YNcUQXb2zk0c",
            "tag": "img",
            "classes": [
                "full-screen"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709808111201-Rectangle%20535.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "idWtYBSNRG-KdM6-N7WP-8w7p-yhmwS8ZzZFo3",
            "tag": "div",
            "classes": [],
            "data": {},
            "children": [
                "idGm5eDBp2-Or7F-dlCH-ptDl-Ok0uWjsIrppZ",
                "idPn6pJB3f-KMHz-PVnM-OUJV-dM5mfXokyPZn",
                "idRUNhM2NY-tcm1-bXEF-ezGu-YNcUQXb2zk0c"
            ],
            "type": "Container"
        },
        {
            "_id": "idobwnXAsI-OdTc-fxEx-rPOA-UVxOcBnBY2z8",
            "tag": "hr",
            "classes": [],
            "data": {},
            "children": [],
            "type": "Horizontal Line"
        },
        {
            "_id": "idgZMWH2KQ-ZxiK-Y3hf-ONRT-ByxuiI5ecEmg",
            "tag": "img",
            "classes": [
                "arrow-up"
            ],
            "data": {
                "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1710324623153-Vector.png"
            },
            "children": [],
            "type": "Image"
        },
        {
            "_id": "ida0jPtwEb-T2sF-xMlQ-PG55-FteghWCgZhLi",
            "tag": "div",
            "classes": [],
            "data": {},
            "children": [
                "idgZMWH2KQ-ZxiK-Y3hf-ONRT-ByxuiI5ecEmg"
            ],
            "type": "Container"
        },
        {
            "_id": "ids390c1VV-lA8O-EPQf-RI4m-CRJiVFm68dx9",
            "text": true,
            "v": "Skincare X"
        },
        {
            "_id": "idvoILQXq8-NIkF-arJ3-YAjQ-gVEB6uThk0QN",
            "tag": "h4",
            "classes": [
                "skincare"
            ],
            "data": {},
            "children": [
                "ids390c1VV-lA8O-EPQf-RI4m-CRJiVFm68dx9"
            ],
            "type": "Heading 4"
        },
        {
            "_id": "idc3JX9tSM-Svu3-83BP-tWSK-3wwJFWTUDjjI",
            "text": true,
            "v": "Next Project"
        },
        {
            "_id": "idQbx2EXb2-RKyW-sa6w-UKqU-5AMHO8QKya2d",
            "tag": "p",
            "classes": [
                "next-project"
            ],
            "data": {},
            "children": [
                "idc3JX9tSM-Svu3-83BP-tWSK-3wwJFWTUDjjI"
            ],
            "type": "Paragraph"
        },
        {
            "_id": "idIzdM2duM-EePu-fA82-TeYu-iHKqJtvlEdES",
            "tag": "div",
            "classes": [],
            "data": {},
            "children": [
                "idvoILQXq8-NIkF-arJ3-YAjQ-gVEB6uThk0QN",
                "idQbx2EXb2-RKyW-sa6w-UKqU-5AMHO8QKya2d"
            ],
            "type": "Container"
        },
        {
            "_id": "id8kCpwYjS-YLnE-tSJB-7hym-9GH5EA9RWNjL",
            "tag": "footer",
            "classes": [
                "footing"
            ],
            "data": {},
            "children": [
                "ida0jPtwEb-T2sF-xMlQ-PG55-FteghWCgZhLi",
                "idIzdM2duM-EePu-fA82-TeYu-iHKqJtvlEdES"
            ],
            "type": "Footer"
        }
    ],
    "styles": {
        "data": {
            "appliedStylesMap": {},
            "breakpoints": {
            },
            "macros": [], "migrations": { "stylesNext": true }, "swatches": []
        },
        "style": [
            {
                "style_id": "40ce0780-471b-48cb-badf-1fc955ffa234",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "*, ::before, ::after",
                    "sel": "*, ::before, ::after",
                    "styleLess": "box-sizing: border-box;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "99ab7796-f55a-43e0-a15c-877634f3c965",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "html, body",
                    "sel": "html, body",
                    "styleLess": "font-family: inter; height: 100%; width: 100%; padding: 0px; max-width: 1600px; margin: auto;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "c03a8ac3-4efe-4291-9517-58ea69621a90",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "body",
                    "sel": "body",
                    "styleLess": "line-height: 1.5; -webkit-font-smoothing: antialiased; font-family: Poppins, sans-serif;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "722cfdba-4992-4030-a11e-80c184142dfb",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "img",
                    "sel": "img",
                    "styleLess": "display: block;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "e1566e8f-8b66-4614-9e42-f77bed8c41a2",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "ul",
                    "sel": "ul",
                    "styleLess": "list-style: none; padding: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "28c780cb-cbb3-493c-a20e-fb3387c035cd",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "a",
                    "sel": "a",
                    "styleLess": "text-decoration: none; color: black;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "451cf1be-a434-457e-86f6-5bc6ebbd92b2",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "p, h1, h2, h3, h4, h5, h6",
                    "sel": "p, h1, h2, h3, h4, h5, h6",
                    "styleLess": "overflow-wrap: break-word; margin: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "53dcbda9-e3d3-4a0b-a868-15dbc90f0678",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "#main",
                    "sel": "#main",
                    "styleLess": "padding: 2em 100em;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "d86fa27b-4f02-46b3-8100-2075cff90afe",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".nav_bio",
                    "styleLess": "display: flex; flex-direction: column; gap: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "ccc1baff-a0e9-48b6-bd7a-94cf691ba66f",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product-designer",
                    "styleLess": "display: flex; align-items: center; gap: 10px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "6c2e8292-8f7d-44dd-828e-80456ce0b51c",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product-image",
                    "styleLess": "width: 45px; height: 45px; padding-top: 5px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "e52726a7-ec56-468e-9a94-bfc5dfa27d6e",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".designer",
                    "styleLess": "color: rgb(152, 162, 179); font-size: 13px; margin: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "5ecc904e-30c0-49e9-b621-41baf7375d7b",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".header",
                    "styleLess": "display: flex; justify-content: space-between; gap: 20px; padding-left: 20px; padding-right: 20px;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".header",
                            "styleLess": "display: flex; gap: 5em; justify-content: space-around; padding-right: 30px;"
                        }
                    }
                }
            },
            {
                "style_id": "7027fd6e-2ad8-4f2d-9495-30156df9c817",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".header-list",
                    "styleLess": "display: none;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "6b8946b9-2f19-4af4-94bf-a727c275568a",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".menu-icon",
                    "styleLess": "width: 40px; height: 50px; margin: 10px;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".menu-icon",
                            "styleLess": "display: none;"
                        }
                    }
                }
            },
            {
                "style_id": "6b0bef1b-5530-4ec2-b99d-1f9ba46300b6",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product-head",
                    "styleLess": "font-size: 1.8em; width: 100%; line-height: 1.5em;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "d99261ec-ef6e-4364-a33f-26829fba8a1e",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "p",
                    "sel": "p",
                    "styleLess": "font-size: 15px; line-height: 30px; color: rgb(52, 64, 84);",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "48f0e95e-59c7-44ef-bbd1-f0e30f084c92",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".product_UK-img",
                    "styleLess": "padding: 0px; overflow: hidden;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "29af90c8-b361-4d33-87b1-2427010dd61a",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".design-image",
                    "styleLess": "width: 100%; height: 100%;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "d079126d-916d-4e53-a5be-ba87130355f0",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".header_hr",
                    "styleLess": "margin-top: 0px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "8d12f3b7-e3a1-4bd1-9f87-bde98493e6de",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".horizontal-line",
                    "styleLess": "width: 90%;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "fe06e709-e85f-49d2-80cc-9f7fce671556",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".spear-application",
                    "styleLess": "font-size: 30px; padding: 1.5em 1.4em 1.5em 0px;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".spear-application",
                            "styleLess": "font-size: 80px;"
                        },
                        "medium": {
                            "sel": ".spear-application",
                            "styleLess": "text-align: center;"
                        }
                    }
                }
            },
            {
                "style_id": "e6df1963-a521-411e-a046-74758a8c8cda",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".full-screen",
                    "styleLess": "width: 90%; height: 100%; padding-bottom: 40px;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".full-screen",
                            "styleLess": "width: 95%; height: 120%;"
                        }
                    }
                }
            },
            {
                "style_id": "df7f2e24-4c9c-4b0b-b2ad-9d1cca452bef",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".client",
                    "styleLess": "display: flex; gap: 5px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "981b124a-68bb-4ff1-8ea8-c02df26c6b41",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".servicee",
                    "styleLess": "display: flex; justify-content: space-around; margin: 0px 20px; gap: 1em;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".servicee",
                            "styleLess": "justify-content: space-around; gap: 23em;"
                        },
                        "medium": {
                            "sel": ".servicee",
                            "styleLess": "justify-content: flex-start; gap: 1em; margin-left: 50px;"
                        },
                        "large": {
                            "sel": ".servicee",
                            "styleLess": "justify-items: flex-start; gap: 0px;"
                        }
                    }
                }
            },
            {
                "style_id": "f6140f81-22ca-4198-9171-5bc6a6a69cfd",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".client-service",
                    "styleLess": "color: rgb(152, 162, 179); font-size: 13px;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".client-service",
                            "styleLess": "font-size: 14px;"
                        }
                    }
                }
            },
            {
                "style_id": "7c371d7b-d031-4ebc-a7a7-1369f36ccb74",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".client-design",
                    "styleLess": "font-size: 13px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "6b34b26b-5ef4-43ef-8cb1-61f02be0c466",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".live-project",
                    "styleLess": "background-color: rgb(234, 236, 239); border-radius: 7px; padding: 5px; font-size: 14px;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".live-project",
                            "styleLess": "height: 30px; padding: 5px;"
                        }
                    }
                }
            },
            {
                "style_id": "8422de74-baa5-4442-8547-bc3f860cf843",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".project-note",
                    "styleLess": "display: none;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".project-note",
                            "styleLess": "display: flex;"
                        }
                    }
                }
            },
            {
                "style_id": "2607d515-7313-412a-bc59-bdd53d896658",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".application",
                    "styleLess": "display: flex; justify-content: space-around; gap: 3em; margin-top: 25px;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".application",
                            "styleLess": "justify-content: space-around; gap: 400px;"
                        },
                        "medium": {
                            "sel": ".application",
                            "styleLess": "gap: 60px;"
                        }
                    }
                }
            },
            {
                "style_id": "78692b1d-1acf-4451-8816-8ed770fceee2",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".full-screen",
                    "styleLess": "width: 90%; height: 350px; margin: 20px 15px 10px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "ad41f6f8-ff8d-4bb3-82a3-918a181a6bfe",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".note-three",
                    "styleLess": "font-size: 15px; line-height: 30px; color: rgb(52, 64, 84); margin: 20px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "51f9671d-b912-4d43-af98-1038811f9b68",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".note-two",
                    "styleLess": "font-size: 15px; line-height: 30px; color: rgb(52, 64, 84); margin: 20px;",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".note-two",
                            "styleLess": "display: none;"
                        }
                    }
                }
            },
            {
                "style_id": "c9cd59ac-41c5-49d9-b598-0ab80384dc60",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".concepts",
                    "styleLess": "font-size: 25px; margin-top: 50px; padding-left: 20px;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".concepts",
                            "styleLess": "margin-left: 20px;"
                        }
                    }
                }
            },
            {
                "style_id": "b0948c5e-8a82-4ab1-a9db-06b43eaefd43",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".footing",
                    "styleLess": "display: flex; margin-top: 20px; justify-content: space-around; gap: 10em;",
                    "type": "class",
                    "variants": {
                        "small": {
                            "sel": ".footing",
                            "styleLess": "justify-content: space-around; gap: 35em;"
                        },
                        "medium": {
                            "sel": ".footing",
                            "styleLess": "gap: 51em;"
                        }
                    }
                }
            },
            {
                "style_id": "a9dc6595-54dd-479e-a69a-fc6f430e88b5",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": "",
                    "sel": ".arrow-up",
                    "styleLess": "width: 28px; height: 30px; border: 1px solid; border-radius: 50px; padding: 4px;",
                    "type": "class",
                    "variants": {}
                }
            },
            {
                "style_id": "cfff355d-9667-470a-b667-c3138e2edfa4",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": ".ellipse",
                    "sel": ".ellipse",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".ellipse",
                            "styleLess": "width: 8px; height: 8px; border-radius: 5px; background-color: rgb(3, 152, 85); margin-top: 7px;"
                        }
                    }
                }
            },
            {
                "style_id": "02dc6805-f667-4818-bd5e-fbd1bebb2208",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": ".available-freelance",
                    "sel": ".available-freelance",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".available-freelance",
                            "styleLess": "display: flex; padding: 0px 10px; gap: 7px; height: 25px; margin-left: 50px; border-radius: 12px; background-color: rgb(242, 244, 247);"
                        }
                    }
                }
            },
            {
                "style_id": "3860e1d2-d94b-4d35-9825-7b60acc6a0d1",
                "data": {
                    "comb": "",
                    "affects": {},
                    "children": [],
                    "name": ".concept",
                    "sel": ".concept",
                    "styleLess": "",
                    "type": "class",
                    "variants": {
                        "medium": {
                            "sel": ".concept",
                            "styleLess": "display: flex; gap: 50px; text-align: justify; padding: 10px 20px 30px 50px;"
                        }
                    }
                }
            }
        ]
    },
}

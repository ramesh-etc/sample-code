

// import EzTekPAYLogo from '../../../images/EzTekPAY.svg';



const pdfDefinition = (props) => {
    const { logo, summary, collectedInvoices, collectedreport = [], fromDate, toDate, mewAccountsAddedSummary, accountsFullyProcessedSummary, html } = props;

    const logosvg = '<svg width="211" height="35" viewBox="0 0 211 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.01459 5.965V16.45H16.4446V19.825H5.01459V30.625H17.7946V34H0.91959V2.59H17.7946V5.965H5.01459ZM27.0509 30.625H39.1559V34H22.3709V30.625L34.3409 12.67H22.4609V9.34H39.0659V12.67L27.0509 30.625ZM63.7744 2.635V5.965H55.2244V34H51.1294V5.965H42.5344V2.635H63.7744ZM91.3151 20.725C91.3151 21.505 91.2701 22.33 91.1801 23.2H71.4701C71.6201 25.63 72.4451 27.535 73.9451 28.915C75.4751 30.265 77.3201 30.94 79.4801 30.94C81.2501 30.94 82.7201 30.535 83.8901 29.725C85.0901 28.885 85.9301 27.775 86.4101 26.395H90.8201C90.1601 28.765 88.8401 30.7 86.8601 32.2C84.8801 33.67 82.4201 34.405 79.4801 34.405C77.1401 34.405 75.0401 33.88 73.1801 32.83C71.3501 31.78 69.9101 30.295 68.8601 28.375C67.8101 26.425 67.2851 24.175 67.2851 21.625C67.2851 19.075 67.7951 16.84 68.8151 14.92C69.8351 13 71.2601 11.53 73.0901 10.51C74.9501 9.46 77.0801 8.935 79.4801 8.935C81.8201 8.935 83.8901 9.445 85.6901 10.465C87.4901 11.485 88.8701 12.895 89.8301 14.695C90.8201 16.465 91.3151 18.475 91.3151 20.725ZM87.0851 19.87C87.0851 18.31 86.7401 16.975 86.0501 15.865C85.3601 14.725 84.4151 13.87 83.2151 13.3C82.0451 12.7 80.7401 12.4 79.3001 12.4C77.2301 12.4 75.4601 13.06 73.9901 14.38C72.5501 15.7 71.7251 17.53 71.5151 19.87H87.0851ZM110.49 34L100.815 23.11V34H96.7204V0.7H100.815V20.275L110.31 9.34H116.025L104.415 21.625L116.07 34H110.49Z" fill="#2DCFC1"/><path d="M144 12.85C144 14.77 143.55 16.525 142.65 18.115C141.78 19.675 140.445 20.935 138.645 21.895C136.875 22.825 134.7 23.29 132.12 23.29H127.755V34H118.935V2.275H132.12C134.67 2.275 136.83 2.725 138.6 3.625C140.4 4.525 141.75 5.77 142.65 7.36C143.55 8.95 144 10.78 144 12.85ZM131.265 16.27C133.755 16.27 135 15.13 135 12.85C135 10.54 133.755 9.385 131.265 9.385H127.755V16.27H131.265ZM167.613 28.825H156.363L154.653 34H145.383L156.948 2.275H167.118L178.638 34H169.323L167.613 28.825ZM165.408 22.075L161.988 11.815L158.613 22.075H165.408ZM210.358 2.275L199.198 23.92V34H190.333V23.92L179.173 2.275H189.253L194.833 14.515L200.413 2.275H210.358Z" fill="#FFAA01"/></svg>'

    function findInlineHeight(cell, maxWidth, usedWidth = 0) {
        function mapTableBodies(innerTableCell) {
            const inlineHeight = findInlineHeight(innerTableCell, maxWidth, usedWidth)
            usedWidth = inlineHeight.width
            return inlineHeight.height
        }
        let calcLines = (inlines) => {
            if (!inlines)
                return {
                    height: 0,
                    width: 0,
                };
            let currentMaxHeight = 0;
            let lastHadLineEnd = false;
            for (const currentNode of inlines) {
                usedWidth += currentNode.width;
                if (usedWidth > maxWidth || lastHadLineEnd) {
                    currentMaxHeight += currentNode.height;
                    usedWidth = currentNode.width;
                } else {
                    currentMaxHeight = Math.max(currentNode.height, currentMaxHeight);
                }
                lastHadLineEnd = !!currentNode.lineEnd;
            }
            return {
                height: currentMaxHeight,
                width: usedWidth,
            };
        }
        if (cell._offsets) {
            usedWidth += cell._offsets.total;
        }
        if (cell._inlines && cell._inlines.length) {
            return calcLines(cell._inlines);
        } else if (cell.stack && cell.stack[0]) {
            return cell.stack.map(item => {
                return findInlineHeight(item, maxWidth);
            }).reduce((prev, next) => {
                return {
                    height: prev.height + next.height,
                    width: Math.max(prev.width + next.width)
                };
            });
        } else if (cell.table) {
            let currentMaxHeight = 0;
            for (const currentTableBodies of cell.table.body) {
                const innerTableHeights = currentTableBodies.map(mapTableBodies);
                currentMaxHeight = Math.max(...innerTableHeights, currentMaxHeight);
            }
            return {
                height: currentMaxHeight,
                width: usedWidth,
            };
        } else if (cell._height) {
            usedWidth += cell._width;
            return {
                height: cell._height,
                width: usedWidth,
            };
        }

        return {
            height: null,
            width: usedWidth,
        };
    }

    function applyVerticalAlignment(node, rowIndex, align, manualHeight = 0) { // New default argument
        const allCellHeights = node.table.body[rowIndex].map(
            (innerNode, columnIndex) => {
                // if (innerNode._span) return null
                const calcWidth = [...Array(innerNode.colSpan || 1).keys()].reduce((acc, i) => {
                    return acc + node.table.widths[columnIndex + i]._calcWidth
                }, 0)
                const mFindInlineHeight = findInlineHeight(innerNode, calcWidth, 0, rowIndex, columnIndex)
                return mFindInlineHeight.height;
            }
        );
        const maxRowHeight = manualHeight ? manualHeight[rowIndex] : Math.max(...allCellHeights); // handle manual height // handle manual height
        node.table.body[rowIndex].forEach((cell, ci) => {
            if (allCellHeights[ci] && maxRowHeight > allCellHeights[ci]) {
                // if (allCellHeights[ci]) { // CHANGE #1: don't check for maxRowHeight > allCellHeights[ci] here
                let topMargin;

                let cellAlign = align;
                if (Array.isArray(align)) {
                    cellAlign = align[ci];
                }

                if (cellAlign === 'bottom') {
                    topMargin = maxRowHeight - allCellHeights[ci];
                } else if (cellAlign === 'center') {
                    topMargin = (maxRowHeight - allCellHeights[ci]) / 2;
                    if (topMargin === 0) { // CHANGE #2: set topMargin to 2 if zero
                        topMargin = 2
                    }
                }

                if (topMargin) {
                    if (cell._margin) {
                        cell._margin[1] = topMargin;
                    } else {
                        cell._margin = [0, topMargin, 0, 0];
                    }
                }
            }
        });
    }


    var docDefinition = {
        info: {
            title: 'Report',
            filename: "myfilename.pdf"
        },
        pageSize: 'A4',
        pageOrientation: 'portait',
        pageMargins: [35, 30, 35, 30],
        // footer: function (currentPage) {
        //     return {
        //         height: 5,
        //         table: {
        //             width: '*',
        //             heights: 5,
        //             body: [
        //                 [
        //                     // { text: "DWC Form RFA (version 01/2014)", alignment: 'left', fontSize: 7, margin: [45, 0, 50, 0] },
        //                     // border
        //                     { text: "Page " + currentPage.toString(), alignment: 'right', fontSize: 7, margin: [300, 5, 30, 0], width: '100%' },
        //                 ],
        //             ]
        //         },
        //         layout: 'noBorders'
        //     };
        // },
        footer: function (currentPage, pageCount) { return { text: "Page " + currentPage.toString(), alignment: 'center', fontSize: 7, margin: [5, 10, 0, 0] } },
        content: [
            {
                // image: `${logo}`,
                svg: logosvg,
                fit: [175, 175],
                // width: 200,
                // height: 90,
                // margin: [200, 0, 0, 0],
                alignment: 'center'
            },
            {
                text: `New Accounts Added (${fromDate} to ${toDate})`,
                margin: [0, 30, 0, 0],
                bold: true,
                // decoration: 'underline'
            },
            {
                table: {
                    widths: ['25%', '25%'],
                    body: mewAccountsAddedSummary

                },
                layout: 'noBorders'
            },

            {
                text: `Account(s) Processed (${fromDate} to ${toDate})`,
                margin: [0, 30, 0, 0],
                bold: true,
                // decoration: 'underline'
            },
            {
                table: {
                    widths: ['25%', '25%'],
                    body: accountsFullyProcessedSummary

                },
                layout: 'noBorders'
            },

            collectedreport.length ?
                {
                    text: "Collected Invoices",
                    margin: [0, 30, 0, 0],
                    bold: true,
                    // decoration: 'underline'
                }
                : {},

            collectedreport.length ?
                {
                    table: {
                        headerRows: 1,
                        dontBreakRows: true,
                        heights: 30,
                        // widths: ['16.5%', '17%', '16%', '16%', '16%', '16%'],
                        widths: [100, 100, 65, 68, 62, 65],
                        body: collectedInvoices,
                        alignment: "center"
                    },
                    margin: [0, 5, 0, 0],
                    // layout: {
                    //     paddingTop: function (index, node) {
                    //         applyVerticalAlignment(node, index, 'center');
                    //         return 0;
                    //     },
                    // }
                }
                : {},
            // html

        ],
        styles: {
            summaryContent: {
                lineHeight: 0.7,
                fontSize: 11
            },
            invoiceCollectedContent: {
                // lineHeight: 0.7,
                fontSize: 11,
                alignment: 'center',
                padding: 0,
            },
            tableheading: {
                bold: true,
                // lineHeight: 0.7,
                fontSize: 11,
                alignment: 'center'
            },
            // "green": {
            //     "color": "green"
            // },
            // "alignSelf": {
            //     "margin": 2,
            //     "height": 500,
            //     "color": "red",
            //     "verticalAlign": "center"
            // }
        },
        defaultStyle: {
            font: 'Poppins', // Use the font name without the file extension
        },
    };


    return docDefinition;
}

export default pdfDefinition;
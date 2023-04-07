export class NumberFormatUtil {
    // format a number to decimal
    private static intFormat(n) {
        let regex = /(\d)((\d{3}\.?)+)$/;

        n = n.split('.').join('');

        while (regex.test(n)) {
            n = n.replace(regex, '$1.$2');
        }

        return n;
    }

    // cut the real number and decimal point, and format the real number
    public static numFormat(n) {
        let pointReg = /([\d\.,]*)\,(\d*)$/, f;

        if (pointReg.test(n)) {
            f = RegExp.$2;
            return this.intFormat(RegExp.$1) + ',' + f;
        }
        return this.intFormat(n);
    }

    public static toVNLocale(number): string {
        number = Number.parseFloat(number);
        let formatedNumber;
        formatedNumber = number.toString().replace(/\./g, ',');
        return formatedNumber;
    }

    public static toWorldLocale(number): string {
        let formatedNumber;
        formatedNumber = number.toString().replace(/\./g, '').replace(/,/g, '.');
        return formatedNumber;
    }
}
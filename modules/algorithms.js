export default {
    KOI7_ASCII(char){
        let number = char.charCodeAt(0);
    
        const swapArray=[
            "Ю","А","Б","Ц","Д","Е","Ф","Г","Х","И","Й","К","Л","М","Н","О",
            "П","Я","Р","С","Т","У","Ж","В","Ь","Ы","З","Ш","Э","Щ","Ч","*"
        ]
    
        if(number >= 0x60 && number < 0x80){
            return swapArray[number-0x60];
        }
            
        return char;
    },
    ASCII_KOI7(char){
        const swapArray=[
            "Ю","А","Б","Ц","Д","Е","Ф","Г","Х","И","Й","К","Л","М","Н","О",
            "П","Я","Р","С","Т","У","Ж","В","Ь","Ы","З","Ш","Э","Щ","Ч","*"
        ];

        const ind = swapArray.indexOf(char)
    
        if(ind>=0){
            return String.fromCharCode(0x60 + ind);
        }
            
        return char;
    },
}

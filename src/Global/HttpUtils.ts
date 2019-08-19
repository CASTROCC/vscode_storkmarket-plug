var http = require("http");
var iconv = require('iconv-lite');
export function get(url: string, call: (data: any) => void): any {
    
    http.get(url,(res: any)=>{
        var length = 0;
        var arr: any[] = [];
        res.on("data",function(chunk: any){
            arr.push(chunk);
            length+=chunk.length;
        });   
        res.on("end",function(){
            var data = Buffer.concat(arr,length);
            var change_data = iconv.decode(data,'gb18030'); 
            if (call) {
                call(change_data);
            }
        }) 
    })
}

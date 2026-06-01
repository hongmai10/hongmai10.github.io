$(function(){
    $("#get_number").click(function(){
        var min=$("#minval_input").val(), max=$("#maxval_input").val(), cnt=$("#numcnt_input").val();
        var spe=$("#specified_id").val(), pr=$("#specified_pr").val();
        
        if(!/^\d+$/.test(min)||!parseInt(min)||parseInt(min)<1){alert("最小值应为1-50的正整数");return;}
        if(!/^\d+$/.test(max)||!parseInt(max)||parseInt(max)>50){alert("最大值应为1-50的正整数");return;}
        if(!/^\d+$/.test(cnt)||parseInt(cnt)<1||parseInt(cnt)>20){alert("抽取数量应为1-20");return;}
        
        min=parseInt(min); max=parseInt(max); cnt=parseInt(cnt);
        if(min>max){alert("最大值不能小于最小值");return;}

        var totalNumbers = max - min + 1;
        if(cnt > totalNumbers){
            alert("抽取数量不能超过可用学号总数(" + totalNumbers + ")");
            return;
        }

        var spList=[], spPr=0, hasSp=false;
        if(spe.trim()!=""||pr.trim()!=""){
            hasSp=true;
            if(!/^[\d\s]+$/.test(spe)){alert("指定学号格式错误");return;}
            if(!/^\d+(\.\d+)?$/.test(pr)){alert("概率格式错误");return;}
            spPr=parseFloat(pr);
            if(spPr<0||spPr>1){alert("概率应在0-1之间");return;}
            spe.split(" ").forEach(function(v){if(v)spList.push(parseInt(v));});
            spList.forEach(function(v){if(v<min||v>max){alert("指定学号超出范围");throw"stop";}});
        }

        var is17Specified = spList.indexOf(17) !== -1;

        var result=[];
        var usedNumbers = [];

        var allNumbers = [];
        for(var i=min; i<=max; i++){
            allNumbers.push(i);
        }

        if(cnt > 1 && cnt <= totalNumbers){
            for(var i=allNumbers.length-1; i>0; i--){
                var j=Math.floor(Math.random()*(i+1));
                var temp=allNumbers[i];
                allNumbers[i]=allNumbers[j];
                allNumbers[j]=temp;
            }

            for(var i=0; i<cnt; i++){
                var currentNum = allNumbers[i];

                if(currentNum === 17 && !is17Specified && !hasSp){
                    if(Math.random() > 0.1){
                        var remainingNumbers = allNumbers.slice(i+1).filter(function(num){
                            return num !== 17 || is17Specified || hasSp;
                        });
                        if(remainingNumbers.length > 0){
                            var randomIndex = Math.floor(Math.random() * remainingNumbers.length);
                            currentNum = remainingNumbers[randomIndex];
                            var indexInAll = allNumbers.indexOf(currentNum);
                            if(indexInAll !== -1){
                                allNumbers.splice(indexInAll, 1);
                                for(var k=min; k<=max; k++){
                                    if(allNumbers.indexOf(k) === -1 && !result.includes(k) && k !== 17){
                                        allNumbers.push(k);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                if(hasSp && spList.indexOf(currentNum)!=-1){
                    if(Math.random()<spPr){
                        result.push(currentNum);
                    } else {
                        var remainingNonSp = allNumbers.slice(i).filter(function(num){
                            return spList.indexOf(num)===-1;
                        });
                        if(remainingNonSp.length>0){
                            result.push(remainingNonSp[Math.floor(Math.random()*remainingNonSp.length)]);
                        } else {
                            result.push(currentNum);
                        }
                    }
                } else {
                    result.push(currentNum);
                }
            }
        } else {
            for(var i=0;i<cnt;i++){
                var randNum;
                if(hasSp&&Math.random()<spPr){
                    randNum=spList[Math.floor(Math.random()*spList.length)];
                }else{
                    do{
                        if(!is17Specified && !hasSp){
                            var weightedNumbers = [];
                            for(var num=min; num<=max; num++){
                                if(num === 17){
                                    for(var w=0; w<1; w++){
                                        if(Math.random() < 0.1) weightedNumbers.push(num);
                                    }
                                } else {
                                    weightedNumbers.push(num);
                                }
                            }

                            if(weightedNumbers.length === 0){
                                for(var num=min; num<=max; num++){
                                    weightedNumbers.push(num);
                                }
                            }
                            
                            randNum = weightedNumbers[Math.floor(Math.random()*weightedNumbers.length)];
                        } else {
                            randNum=Math.floor(Math.random()*(max-min+1))+min;
                        }
                    }while(usedNumbers.indexOf(randNum)!=-1);
                }
                usedNumbers.push(randNum);
                result.push(randNum);
            }
        }
        
        $("#number_display").text(result.join(" "));
    });
});

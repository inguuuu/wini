var config = {
    showOn: "button",
    buttonImage: "../resources/images/btn_calendar.gif", //버튼이미지에 사용할 이미지 경로
    buttonImageOnly: true, //버튼이미지를 나오게 한다.
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],        // 월 한글로 출력
    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],        // 월 한글로 출력
    dayNamesMin: ['일','월','화','수','목','금','토'],      // 요일 한글로 출력
    dateFormat: 'yy-mm-dd', //데이터 포멧형식
    changeYear: true,    //년별로 선택 할 수 있다.
    changeMonth: true,   //달별로 선택 할 수 있다.
    showMonthAfterYear: true, //년 뒤에 월 표시
    showOtherMonths: false,  //이번달 달력안에 상/하 빈칸이 있을경우 전달/다음달 일로 채워준다.
    selectOtherMonths: true,
    numberOfMonths: 1,   //오늘부터 3달치의 달력을 보여준다.
    showButtonPanel: true  //오늘 날짜로 돌아가는 버튼 및 닫기 버튼을 생성한다.
    };
$(document).ready(function(){
$("#tabs").tabs({
active:0

});
getIssue();
function getIssue(){

    $.get('/admin/issue', function(res) {
        for(var i = 0 ; i <res.length ; i++){
        var issuei = res[i].content;
        var useri = res[i].user.name;
        var tag = `${useri}: ${issuei}</br>`;
        var $div = (`${tag}`);
        $('#issue').append($div);
        }
    }, 'json');
}
getVacation();
function getVacation(){//모든휴가 텍스트 부분

    $.get('/admin/vacation', function(res) {
        // 성공 시 ,동작
        console.log('getvacation호출');
        for(var i = 0 ; i <res.length ; i++){
            var name ;
            var type ;
            var start_date;
            var end_date;
            var reason;
            var a;
            var createdAt;
            name = res[i].user.name;
            switch(res[i].type){
                case 'break1' :
                    type ='연가';
                    break;
                case 'break2' :
                    type ='병가';
                    break;
                case 'break3' :
                    type ='공가';
                    break;
                case 'break4' :
                    type ='특별휴가';
                    break;
                case 'break5' :
                    type ='기타';
                    break;
            }
            start_date = res[i].start_date;
            end_date = res[i].end_date;
            reason = res[i].reason;
            var tag = `${name}: (${type}, ${start_date} ~ ${end_date}, 사유: ${reason}</br>`;
            console.log(`${name}님의 (${type})은/는 (${start_date})부터 (${end_date})까지 입니다. 사유: ${reason} 입니다.`);
            var $div = (`${tag}`);
            $('#vacation').append($div);


           //===========여기부터 휴가 테이블에 넣기=====//
            console.log(today = new Date());
            console.log(day = today.getDay());
            time = today.getTime();
            gap = -(day-1);
            result = "";

            for(j=gap; j<gap+7; j++) {
            newtime = time + (3600000 * (24*j));
            today.setTime(newtime);
            result = setDate(today);
            }
            function setDate(today) {
                year = today.getFullYear();
                month = today.getMonth()+1;
                date = today.getDate();
                if(date<10){
                formdate = year+'-0'+month+'-0'+date;
                }else{
                formdate = year+'-0'+month+'-'+date;
                }
                return formdate;
            }
        }
      }, 'json');
}

getVacation2();
function getVacation2(){//달력에 휴가 넣는 부분, 이번주 보고한 휴가 보여주는곳

    $.get('/admin/vacation', function(res) {
        // 성공 시 ,동작
        console.log(res);

        var today = new Date();
        var day = today.getDay();
        var time = today.getTime();
        var gap = -(day-1);
        var result = [];
        var num=0;
        for(j=gap; j<gap+7; j++) {

        newtime = time + (3600000 * (24*j));
        today.setTime(newtime);
        result[num] = setDate(today);
        num++;
       console.log(result[num]);
       console.log(num);
        }
        function setDate(today) {
            year = today.getFullYear();
            month = today.getMonth()+1;
            date = today.getDate();
            if(date<10){
            formdate = year+'-0'+month+'-0'+date;
            }else{
            formdate = year+'-0'+month+'-'+date;
            }
            return formdate;
        }

        for(t1=0;t1<$('.trip_vac').length;t1++){//소제목: [휴가]
           $('.trip_vac').eq(t1).append("휴가  <br>");
       }

        for(var i = 0 ; i <res.length ; i++){
            var name ;
            var type ;

            var start_date;
            var end_date;
            var reason;
            var a;

            name = res[i].user.name;
            switch(res[i].type){
                case 'break1' :
                    type ='연가';
                    break;
                case 'break2' :
                    type ='출산';
                    break;
                case 'break3' :
                    type ='반차';
                    break;
            }
            start_date = res[i].start_date;
            end_date = res[i].end_date;
            reason = res[i].reason;


           //===========여기부터 휴가 달력에 넣기=====//


           var $vacationtag =`${name}: (${type})`+'<br/>';


           if(start_date<=result[0]&&result[0]<=end_date){
           $('#vacation_mon').append($vacationtag+" ");
           }
           if(start_date<=result[1]&&result[1]<=end_date){
            $('#vacation_thu').append($vacationtag+" ");
           }
           if(start_date<=result[2]&&result[2]<=end_date){
            $('#vacation_wed').append($vacationtag+" ");
           }
           if(start_date<=result[3]&&result[3]<=end_date){
            $('#vacation_thr').append($vacationtag+" ");
           }
           if(start_date<=result[4]&&result[4]<=end_date){
            $('#vacation_fri').append($vacationtag+" ");
           }


           //////////////////이번주 올린 휴가 보여주는 곳////////////////


           var $thisweeksendvacation =`<p> - ${name}: (${type}, ${start_date} ~ ${end_date})</p>`;
           for(t=0;t<$('.trip_vac').length;t++){
               if($('.trip_vac')[t].dataset.teamName==res[i].user.teamname){
                   for(f=0;f<5;f++){
                       if(result[f]==res[i].createdAt.substring(0,10)){
                        console.log("여기까지옵니다.")
                        var temp2=`${name}`;
                        $('.trip_vac').eq(t).append($thisweeksendvacation);
                        break;
                       }
                   }

               }
           }

         }

            console.log("========================종료2");

      }, 'json');
}

getBusiness_trip();
function getBusiness_trip(){//모든 출장 쓰는곳
    $.get('/admin/business_trip',  function(res) {
        // 성공 시 동작
        console.log(res);
        for(var i = 0 ; i <res.length ; i++){
            var name ;
            var type ;
            var place;
            var start_date;
            var end_date;
            var reason;
            var createdAt;
            name = res[i].user.name;
            switch(res[i].type){
                case 'type1' :
                    type ='시내';
                    break;
                case 'type2' :
                    type ='시외';
                    break;
                case 'type3' :
                    type ='해외';
                    break;
                case 'type4' :
                    type ='파견';
                    break;
                case 'type5' :
                    type ='부임';
                    break;
                case 'type6' :
                    type ='기타';
                    break;
            }
            switch(res[i].place){
                case 'place1' :
                    place ='대구';
                    break;
                case 'place2' :
                    place ='서울';
                    break;
                case 'place3' :
                    place ='부산';
                    break;
                case 'place4' :
                    place ='기타';
                    break;
            }
            start_date = res[i].start_date;
            end_date = res[i].end_date;
            reason = res[i].reason;
            var tag = `${name}: (${type}, ${place}, ${start_date} ~ ${end_date}, 사유: ${reason}</br>`;
            var $div = (`${tag}`);

            $('#business_trip').append($div);

             time = today.getTime();
             gap = -(day-1);
             result = "";

             for(j=gap; j<gap+7; j++) {
             newtime = time + (3600000 * (24*j));
             today.setTime(newtime);
             result = setDate(today);
             }
             function setDate(today) {
               year = today.getFullYear();
               month = today.getMonth()+1;
               date = today.getDate();
               if(date<10){
                 formdate = year+'-0'+month+'-0'+date;
               }else{
                 formdate = year+'-0'+month+'-'+date;
               }
          return formdate;
      }
        }
      }, 'json');
}
getBusiness_trip2();//달력 출장 추가 및 이번주 보고한 출장 쓰는 곳
function getBusiness_trip2(){
    $.get('/admin/business_trip',  function(res) {
        // 성공 시 동작
        var today = new Date();
        var day = today.getDay();
        var time = today.getTime();
        var gap = -(day-1);
        var result = [];
        var num=0;
        for(j=gap; j<gap+7; j++) {

        newtime = time + (3600000 * (24*j));
        today.setTime(newtime);
        result[num] = setDate(today);
        num++;
       console.log(result[num]);
       console.log(num);
        }
        function setDate(today) {
            year = today.getFullYear();
            month = today.getMonth()+1;
            date = today.getDate();
            if(date<10){
            formdate = year+'-0'+month+'-0'+date;
            }else{
            formdate = year+'-0'+month+'-'+date;
            }
            return formdate;
        }

        for(t1=0;t1<$('.trip_vac').length;t1++){//소제목: [휴가]
          $('.trip_vac').eq(t1).append("출장");
      }

        for(var i = 0 ; i <res.length ; i++){
            var name ;
            var type ;
            var place;
            var start_date;
            var end_date;
            name = res[i].user.name;
            switch(res[i].type){
                case 'type1' :
                    type ='시내';
                    break;
                case 'type2' :
                    type ='시외';
                    break;
                case 'type3' :
                    type ='해외';
                    break;
                case 'type4' :
                    type ='파견';
                    break;
                case 'type5' :
                    type ='부임';
                    break;
                case 'type6' :
                    type ='기타';
                    break;
            }
            switch(res[i].place){
                case 'place1' :
                    place ='대구';
                    break;
                case 'place2' :
                    place ='서울';
                    break;
                case 'place3' :
                    place ='부산';
                    break;
                case 'place4' :
                    place ='기타';
                    break;
            }
            start_date = res[i].start_date;
            end_date = res[i].end_date;
            reason = res[i].reason;

            //이번주 달력에 출장쓰는 곳
           var $busttag =`${name}: (${type})`+'<br/>';


           if(start_date<=result[0]&&result[0]<=end_date){
           $('#trip_mon').append($busttag+" ");
           }
           if(start_date<=result[1]&&result[1]<=end_date){
            $('#trip_thu').append($busttag+" ");
           }
           if(start_date<=result[2]&&result[2]<=end_date){
            $('#trip_wed').append($busttag+" ");
           }
           if(start_date<=result[3]&&result[3]<=end_date){
            $('#trip_thr').append($busttag+" ");
           }
           if(start_date<=result[4]&&result[4]<=end_date){
            $('#trip_fri').append($busttag+" ");
           }


           //////////////////이번주 올린 출장 등록////////////////

           var $thisweeksendtrip =`<p> - ${name}: (${type}, ${place}, ${start_date} ~ ${end_date})</p>`;
           for(t=0;t<$('.trip_vac').length;t++){
               if($('.trip_vac')[t].dataset.teamName==res[i].user.teamname){
                   for(f=0;f<5;f++){
                       if(result[f]==res[i].createdAt.substring(0,10)){
                        var temp2=`${name}`;
                        $('.trip_vac').eq(t).append($thisweeksendtrip);
                        break;
                       }
                   }

               }
           }
        }
      }, 'json');
}

getThisweek();
function getThisweek(){

    $.get('/admin/thisweek', function(res) {
        // 성공 시 ,동작

        for(var i = 0 ; i <res.length ; i++){
        var bus_name;
        var bus_place;
        var task_step;
        var task_term;
        var id;
        var user_name;
        var comment;
        var detailcoment;
        bus_name=res[i].thisweek_task.business_name;

        id= res[i].id;
        user_name=res[i].user.name;
        comment=res[i].task_content;
        detailcoment=res[i].detail_content;
        switch(res[i].step){
            case 'step1' :
            task_step ='분석';
                break;
            case 'step2' :
            task_step ='설계';
                break;
            case 'step3' :
            task_step ='구축';
                break;
            case 'step4' :
            task_step ='개발';
                break;
            case 'step5' :
            task_step ='기타';
                break;
        }
        switch(res[i].thisweek_task.place){
            case 'place1' :
            bus_place ='본사';
                break;
            case 'place2' :
            bus_place ='대구';
                break;
            case 'place3' :
            bus_place ='기타';
                break;
        }

        task_term=res[i].term;
        var $dtag = "<br/>" +
        '<div>'+`이름: ${user_name}`+'</div>'+
        '<div>'+`장소: ${bus_place}`+'</div>'+
        '<div>'+`단계: ${task_step}`+'</div>'+
        '<div>'+`기간: ${task_term}`+'</div>'+
        '<div>'+`내용: ${comment}`+'</div>'+
        '<div>'+`상세내용: ${detailcoment}`+'</div>';

        if(bus_name=="1"){

            $('#bus1').append($dtag);
        }
        else if(bus_name=="2"){

            $('#bus2').append($dtag);
        }
        else if(bus_name=="3"){

            $('#bus3').append($dtag);
        }
        }

}, 'json');


}
getTask_content();
async function getTask_content(){

    for(var i = 0 ; i <$('.taskkcontent').length;i++)
    { //A라는 사업이 몇개인지

        var tempnumber2 = $('.taskkcontent')[i].dataset.busKd;

        var copy2;
        var k2=0;
        var name2 = '업무내용은 ';

        await $.get(`/admin/taskkcontents/`+tempnumber2,function(res)
        {

            // 성공 시 동작
            $('.taskkcontent').eq(i).html(res);
        });
    }
}

getParticipant();
async function getParticipant(){
    for(var i = 0 ; i <$('.participant').length;i++){

        var tempnumber = $('.participant')[i].dataset.busId;
        var teamname = $('.participant')[i].dataset.teamName;

        var name = ' ';
        await $.get(`/admin/participants/`+tempnumber+'/'+encodeURIComponent(teamname),function(res) {
            // 성공 시 동작

            var uniqueNames = [];
            $.each(res,function(i,el){
                if($.inArray(el,uniqueNames)===-1)uniqueNames.push(el);
            });

            for(var j=0; j<uniqueNames.length;j++){
                if(uniqueNames[j]===null)
                    continue;
                if(uniqueNames[j]!==undefined){
                    console.log($('.participant').eq(i).next().append(`
                    <p id="T${tempnumber}${uniqueNames[j]}" style="font-weight:normal">-${uniqueNames[j]}</p>
                    `));
                    getdetail(uniqueNames[j],tempnumber);
                }
                if(uniqueNames[0]===undefined){
                  console.log($('.bus_').remove());
                  console.log($('.term_').remove());
                }

                name = name.concat(uniqueNames[j],' ');
            }
          });
                     $('.participant').eq(i).html(name);
           if(name===' '){
            $('.participant').eq(i).prev().remove();
            $('.participant').eq(i).prev().remove();
        }

    }
}
async function getdetail(name,businessnumber){

    //console.log('넘어온 이름과 사업은 :',name,businessnumber);
    await $.get('/admin/details/'+encodeURIComponent(name)+'/'+businessnumber,function(res){

        for(let i = 0; i<res.length;i++){
            let temp;
            switch(res[i].thisweek_task.place){
                case 'place1' :
                    temp = '본사';
                    break;
                case 'place2' :
                    temp = '대구';
                    break;
                case 'place3' :
                    temp = '경북';
                    break;
                default :
                    temp = ' 미정'
            }
            const div =`<div>- ${res[i].task_content} (${res[i].term}) ${temp}</div>`

            $(`#T${businessnumber}${res[0].user.name}`).append(div);
        }

    });
};
function k (){

    function itoStr($num)
    {
        $num < 10 ? $num = '0'+$num : $num;
        return $num.toString();
    }

    var btn = $('#btnExport');
    var tbl = 'view';

    btn.click(function(e){

        var fileName = "MyTable.doc";

        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-word';
        var table_div = document.getElementById( tbl );
        var table_html = table_div.outerHTML.replace(/ /g, '%20');

        a.href = data_type + ', ' + table_html;
        a.download = fileName;
        a.click();

        e.preventDefault();
    });
};
k();



getParticipant1();
async function getParticipant1(){
    console.log('실행1',$('.participant1').length);
    for(var i = 0 ; i <$('.participant1').length;i++){
        console.log('실행2');
        var tempnumber = $('.participant1')[i].dataset.busId;
        var teamname = $('.participant1')[i].dataset.teamName;
        var copy;
        var k=0;
        var name = ' ';
        await $.get(`/admin/participants1/`+tempnumber+'/'+encodeURIComponent(teamname),function(res) {
            // 성공 시 동작
            console.log(res.body);
            console.log('실행3');
            var uniqueNames = [];
            $.each(res,function(i,el){
                if($.inArray(el,uniqueNames)===-1)uniqueNames.push(el);
            });

            for(var j=0; j<uniqueNames.length;j++){
                if(uniqueNames[j]===null)
                    continue;
                if(uniqueNames[j]!==undefined){
                    console.log($('.participant1').eq(i).next().append(`
                    <p id="N${tempnumber}${uniqueNames[j]}" style="font-weight:normal">-${uniqueNames[j]}</p>
                    `));
                    getdetail1(uniqueNames[j],tempnumber);

                }

                name = name.concat(uniqueNames[j],' ');
            }

            //location.reload();
            k++;
          });
           $('.participant1').eq(i).html(name);
          if(name===' '){
           $('.participant1').eq(i).prev().remove();
           $('.participant1').eq(i).prev().remove();
       }
    }
}
async function getdetail1(name,businessnumber){

    //console.log('넘어온 이름과 사업은 :',name,businessnumber);
    await $.get('/admin/details1/'+encodeURIComponent(name)+'/'+businessnumber,function(res){
        console.log($(`#N${businessnumber}${res[0].user.name}`));
        console.log('길이',res.length);
        for(let i = 0; i<res.length;i++){
            let temp;
            switch(res[i].nextweek_task.place){
                case 'place1' :
                    temp = '본사';
                    break;
                case 'place2' :
                    temp = '대구';
                    break;
                case 'place3' :
                    temp = '경북';
                    break;
                default :
                    temp = ' 미정'
            }
            const div =`<div>-${res[i].task_content} (${res[i].term}) ${temp}</div>`
            console.log('종합자료  :',div);
            $(`#N${businessnumber}${res[0].user.name}`).append(div);
        }
        console.log('보낸사람',res[0].user.name);
        console.log(res);
        console.log(res.nextweek_task);
        console.log(res.user);
    });
};



// ============여기부터 모달 =======//
var w = ($(window).width()/2)-($('.modal').width()/2);
var h = ($(window).height()/2)-($('.modal').height()/2);
//modal의 위치 지정
$('.modal').css({
left: w,
top: h
});
//처음엔 modal 안보이게 처리
$('.modalBg').fadeOut(0);
$('.modal').fadeOut(0);
//메인의 팝업존 이미지 클릭시 보이게 처리
$('.modalBtn').click(function(){
w = ($(window).width()/2)-($('.modal').width()/2);
h = ($(window).height()/2)-($('.modal').height()/2);
$('.modal').fadeIn(0);
$('.modalBg').fadeIn(0);
});
//modal의 close X를 클릭시 안보이게 처리
$('.modalCloseBtn').click(function(){
$('.modal').fadeOut(0);
$('.modalBg').fadeOut(0);
});
//============여기까지 모달======
});

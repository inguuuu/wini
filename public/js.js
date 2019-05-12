let this_business_count = 1;
let next_business_count = 1;
let business_total_number=1;
let nextbusiness_total_number=1;
let businessTrip_count=1;
let vacation_count=1;

$(document).ready(function(){
    $("#tabs").tabs({
        active:0
    });
});
$(document).on("click","#userpage",function(e){
    console.log("user버튼눌러졋다");
    $(document).get('/main',function(req){

    }); //URL, callback

});
$(document).on("click","#adminpage",function(e){
    console.log("admin버튼눌러졋다");
    $(document).get('/admin',function(req){


    }); //URL, callback

});
$(document).on("click", "#chk1", function (e) {
    //찾기

    var re1='.*?';	// Non-greedy match on filler
    var re2='(\\d+)';	// Integer Number 1
    var re3='.*?';	// Non-greedy match on filler
    var re4='(\\d+)';	// Integer Number 2
    console.log($(this).parent().parent().find('#table_list.board_area').children().last().find('#search').attr('name'));
    var p = new RegExp(re1+re2+re3+re4,["i"]);
    var m = p.exec($(this).parent().parent().find('#table_list.board_area').children().last().find('#search').attr('name'));
    if (m != null)
    {
        var int1=m[1];
        var int2=m[2];
        console.log("("+int1.replace(/</,"&lt;")+")"+"("+int2.replace(/</,"&lt;")+")"+"\n");
    }

    var business_number =int1*1;
    console.log(business_number);

    var content_number = int2*1;
    console.log(content_number);
    //복사
    $temp = $(this).parent().parent().find('#table_list.board_area').children().last().clone(true);
    //단계 수정
    $temp.children().eq(1).children().eq(0).children().eq(0).children().eq(0).next().children().eq(0).attr('name','Thisweek['+business_number+']['+(content_number+1)+'][step]');
    //업무내용 수정
    //console.log($temp.children().eq(1).children().eq(0).children().eq(2).children().eq(0).children());
    $temp.children().eq(1).children().eq(0).children().eq(2).children().eq(0).children().attr('name','Thisweek['+business_number+']['+(content_number+1)+'][content]');
    console.log($temp.children().eq(1).children().eq(0).children().eq(2).children().eq(0).children().val(""));
    //기간 수정
    $temp.children().eq(1).children().eq(0).children().eq(4).children().eq(0).children().attr('name','Thisweek['+business_number+']['+(content_number+1)+'][term]');
    $temp.children().eq(1).children().eq(0).children().eq(4).children().eq(0).children().val("");
    //세부내용 수정
    $temp.children().eq(1).children().eq(0).children().eq(6).children().eq(0).children().attr('name','Thisweek['+business_number+']['+(content_number+1)+'][detail]');
    $temp.children().eq(1).children().eq(0).children().eq(6).children().eq(0).children().val("");
    //붙이기
    $(this).parent().parent().find('#table_list.board_area').children().last().after($temp);

});
$(document).on("click","#chk3",function(e){
    //사업 삭제
    //console.log();
    //console.log($(this).parent().parent().children().length);

    if(this_business_count!==1){
        console.log($(this).parent().parent().remove());
        this_business_count--;

    }else{
        //alert('삭제할 수 없습니다');
    }
});
$(document).on("click","#chk4",function(e){
    //완성됨
    console.log($(this).parent().parent().parent().children().length);
    if($(this).parent().parent().parent().children().length!==1){
        $(this).parent().parent().remove();
    }else{
        //alert('삭제할 수 없습니다.');
    }
});

$(document).on("click","#chk2",function(e){
    //이번주 사업추가(완성)
    //console.log($(this).parent().parent().children().eq(0));//복사

    var re1='.*?';   // Non-greedy match on filler
    var re2='(\\d+)';   // Integer Number 1
    var re3='.*?';   // Non-greedy match on filler
    var re4='(\\d+)';   // Integer Number 2

    var p = new RegExp(re1+re2+re3+re4,["i"]);

    var m = p.exec($(this).parent().parent().children().find('#bus').children().last().find('#search').attr('name'));
    console.log($(this).parent().parent().children().find('#bus').children().eq(1));
    console.log($(this).parent().parent().children().find('#bus').children().last().eq(0));
    if (m != null)
    {
        var int1=m[1];
        var int2=m[2];
        console.log("("+int1.replace(/</,"&lt;")+")"+"("+int2.replace(/</,"&lt;")+")"+"\n");
    }

    //console.log($temp = $(this).parent().parent().children().find('#business').last().find('#buscombo').attr('name'));

    var business_number =int1*1;
    //var business_number =$(this).parent().parent().children().find('#bus').children().length;
    console.log('추출된번호'+business_number);
    //var content_number = int2*1;
    //console.log('추출된번호'+content_number);


    console.log($temp = $(this).parent().parent().children().find('#bus').children().last().clone(true));
    console.log($temp.find('#place').attr('name'));
    //사업명
    console.log($temp.children().find('#buscombo').attr('name','Thisweek['+(business_total_number)+'][0][businessname]'));
    //console.log($temp.children().find('#place').attr('name','Thisweek['+(business_number+1)'][0][place]'));

    //$temp.children().eq(0).children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().eq(0).attr('name','Thisweek[111][0][businessname]');

    //장소
    console.log($temp.children().find('#place').attr('name','Thisweek['+(business_total_number)+'][0][place]'));
    //단계
    //console.log($temp.children().eq(1).children().eq(0).children().eq(0).children().eq(0).find(buscombo).attr('name','Thisweek['+(business_number+1)+'][0][place]'));
    console.log($temp.children().find('#search').attr('name','Thisweek['+(business_total_number)+'][1][step]'));
    //업무내용
    console.log($temp.children().find('#content').attr('name','Thisweek['+(business_total_number)+'][1][content]'));
    $temp.children().find('#content').val("");
    //기간
    console.log($temp.children().find('#term').attr('name','Thisweek['+(business_total_number)+'][1][term]'));
    $temp.children().find('#term').val("");
    //상세내용
    console.log($temp.children().find('#detail').attr('name','Thisweek['+(business_total_number)+'][1][detail]'));
    $temp.children().find('#detail').val("");

    //$t.nextAll().remove();
    //console.log($temp.children().eq(0).children().eq(2).children().nextAll().remove());
    //$(this).parent().parent().children().find('#bus').last().after($temp);
    $('#bus').children().last().after($temp);
    this_business_count++;
    console.log($(this).parent().parent().children().find('#bus').children().length);
    business_total_number++;
    console.log($(this).parent().parent().children().find('#bus').children().find('#table_list.board_area').last().eq(0).children().eq(0).nextAll().remove());
});
$(document).on("click","#chk5",function(e){
    //다음주 사업추가(미완)
    var $Business = $(this).parent().children().eq(0).children().eq(0).clone();
    console.log($Business);
    console.log( $Business.children().eq(2).eq(0).children().eq(0).nextAll().remove());
    //console.log( $Business.children().eq(0).children().eq(2).children().eq(0).nextAll().remove());
    $('#bus2').append($Business);
});



//여기서부터 휴가랑 출장 생성/삭제 추가부분
//휴가부분
$(document).on("click","#breakAddBtn",function(e){
    var $break = $(this).parent().parent().parent().find('#break').children().last().clone(true);

    var vp = new RegExp(/\d/g);
    var vm = vp.exec($break.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().attr('name'));
    console.log('==인덱스==');
    console.log(vm[0]);
    var vacation_number =vm[0]*1;

    console.log('==전체==');
    console.log($(this).parent().parent().parent().find('#break').children().last());

    console.log('==부분==');
    console.log(  $break.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().eq(0));

    $break.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().eq(0).attr('name','vacation['+(vacation_number+1)+'][type]');
    $break.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(3).children().eq(0).attr('name','vacation['+(vacation_number+1)+'][start_date]');
    $break.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(3).children().eq(0).val("");
    $break.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(3).children().eq(1).attr('name','vacation['+(vacation_number+1)+'][end_date]');
    $break.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(3).children().eq(1).val("");
   $break.children().eq(1).children().eq(0).children().eq(1).children().eq(0).children().eq(1).children().eq(0).attr('name','vacation['+(vacation_number+1)+'][reason]');
   $break.children().eq(1).children().eq(0).children().eq(1).children().eq(0).children().eq(1).children().eq(0).val("");
   vacation_count++;
    $('#break').append($break);

});

//출장부분
$(document).on("click","#businessTripAddBtn",function(e){

  var $bustrip = $(this).parent().parent().parent().find('#bustrip').children().last().clone(true);

  var tp = new RegExp(/\d/g);
  var tm = tp.exec($bustrip.children().eq(1).children().eq(0).children().eq(0).children().children().eq(1).children().eq(0).attr('name'));
  var bustrip_number =tm[0]*1;

  console.log('==전체==');
  console.log( $(this).parent().parent().parent().find('#bustrip').children().last());

  console.log('==부분==');
  // console.log(  $bustrip.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children());
  //console.log(  $bustrip.children().eq(1).children().eq(0).children().eq(1).children().eq(0).children().eq(1).children().eq(0));
 $bustrip.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().eq(0).attr('name','bustrip['+(bustrip_number+1)+'][type]');
 $bustrip.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(3).children().eq(0).attr('name','bustrip['+(bustrip_number+1)+'][place]');
 $bustrip.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(5).children().eq(0).attr('name','bustrip['+(bustrip_number+1)+'][start_date]');
 $bustrip.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(5).children().val("");
 $bustrip.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(5).children().eq(1).attr('name','bustrip['+(bustrip_number+1)+'][end_date]');
 $bustrip.children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(5).children().eq(1).val("");
 $bustrip.children().eq(1).children().eq(0).children().eq(1).children().eq(0).children().eq(1).children().eq(0).attr('name','bustrip['+(bustrip_number+1)+'][reason]');
 $bustrip.children().eq(1).children().eq(0).children().eq(1).children().eq(0).children().eq(1).children().eq(0).val("");

 businessTrip_count++;
  $('#bustrip').append($bustrip);

});

$(document).on("click","#send",function(e){

    const data= $('#send-form').serializeObject();

    //data.push(id);
    console.log(data);
    console.log($(this).parent().eq(0).children().get(0));
    $all = $(this).parent().eq(0).children().get(0);
    var id = $('#username').attr('value');
    console.log(id);
    $.ajax({
        url: '/sendall',
        type: 'POST',
        data : JSON.stringify({data,id}),
        dataType : 'JSON',
        contentType: 'application/json',
        done: function(response) {
          // 성공 시 동작
        },
        fail: function(error) {
          // 실패 시 동작
        },
        always: function(response) {
          // 성공하든 실패하든 항상 할 동작
        }
      });
});
$(document).on('change','#buscombo',function(e){
    const term =$(this).children().eq(this.value).get(0).dataset.busTerm;
    $(this).parent().next().next().html(term);
});

$(document).on('change','#vac_start',function(e){
    console.log($(this));
    const start_date =$(this)[0].value;
    console.log($(this).parent().find('#vac_end').attr('min',start_date));
});

$(document).on('change','#trip_start',function(e){
    console.log($(this));
    const start_date =$(this)[0].value;
    console.log($(this).parent().find('#trip_end').attr('min',start_date));
});

$(document).on('click','#removevacation',function(e){
    //휴가삭제
    if(vacation_count!==1){
        console.log($(this).parent().remove());
        vacation_count--;
    }else{
        alert('삭제할 수 없습니다');
    }
});
$(document).on('click','#removebustrip',function(e){
  if(businessTrip_count!==1){
      console.log($(this).parent().remove());
      businessTrip_count--;
  }else{
      //alert('삭제할 수 없습니다');
  }
});
///////////////////////////////차주 업무 추가 부분들 ///////////////////////////////////////
$(document).on("click","#nchk3",function(e){
    //사업 삭제
    //console.log();
    //console.log($(this).parent().parent().children().length);

    if(next_business_count!==1){
        console.log($(this).parent().parent().remove());
        next_business_count--;

    }else{
        //alert('삭제할 수 없습니다');
    }
});

$(document).on("click","#nchk2",function(e){
    //다음주 사업추가(완성)
    //console.log($(this).parent().parent().children().eq(0));//복사

    var re1='.*?';   // Non-greedy match on filler
    var re2='(\\d+)';   // Integer Number 1
    var re3='.*?';   // Non-greedy match on filler
    var re4='(\\d+)';   // Integer Number 2

    var p = new RegExp(re1+re2+re3+re4,["i"]);

    var m = p.exec($(this).parent().parent().children().find('#bus2').children().last().find('#search').attr('name'));
    console.log($(this).parent().parent().children().find('#bus2').children().eq(1));
    console.log($(this).parent().parent().children().find('#bus2').children().last().eq(0));
    if (m != null)
    {
        var int1=m[1];
        var int2=m[2];
        console.log("("+int1.replace(/</,"&lt;")+")"+"("+int2.replace(/</,"&lt;")+")"+"\n");
    }

    //console.log($temp = $(this).parent().parent().children().find('#business').last().find('#buscombo').attr('name'));

    var business_number =int1*1;
    //var business_number =$(this).parent().parent().children().find('#bus').children().length;
    console.log('추출된번호'+business_number);
    //var content_number = int2*1;
    //console.log('추출된번호'+content_number);


    console.log($temp = $(this).parent().parent().children().find('#bus2').children().last().clone(true));
    console.log($temp.find('#place').attr('name'));
    //사업명
    console.log($temp.children().find('#buscombo').attr('name','Nextweek['+(nextbusiness_total_number)+'][0][businessname]'));
    //console.log($temp.children().find('#place').attr('name','Thisweek['+(business_number+1)'][0][place]'));

    //$temp.children().eq(0).children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().eq(0).attr('name','Thisweek[111][0][businessname]');

    //장소
    console.log($temp.children().find('#place').attr('name','Nextweek['+(nextbusiness_total_number)+'][0][place]'));
    //단계
    //console.log($temp.children().eq(1).children().eq(0).children().eq(0).children().eq(0).find(buscombo).attr('name','Thisweek['+(business_number+1)+'][0][place]'));
    console.log($temp.children().find('#search').attr('name','Nextweek['+(nextbusiness_total_number)+'][1][step]'));
    //업무내용
    console.log($temp.children().find('#content').attr('name','Nextweek['+(nextbusiness_total_number)+'][1][content]'));
    $temp.children().find('#content').val("");
    //기간
    console.log($temp.children().find('#term').attr('name','Nextweek['+(nextbusiness_total_number)+'][1][term]'));
    $temp.children().find('#term').val("");
    //상세내용
    console.log($temp.children().find('#detail').attr('name','Nextweek['+(nextbusiness_total_number)+'][1][detail]'));
    $temp.children().find('#detail').val("");

    //$t.nextAll().remove();
    //console.log($temp.children().eq(0).children().eq(2).children().nextAll().remove());
    //$(this).parent().parent().children().find('#bus').last().after($temp);
    $('#bus2').children().last().after($temp);
    next_business_count++;
    console.log($(this).parent().parent().children().find('#bus2').children().length);
    nextbusiness_total_number++;
    console.log($(this).parent().parent().children().find('#bus2').children().find('#table_list.board_area').last().eq(0).children().eq(0).nextAll().remove());
});

$(document).on("click","#homebutton",function(e){
    console.log("home버튼눌러졋다");
    $(document).get('/',function(req){

    }); //URL, callback

});

$(document).on("click","#send",function(e){
    console.log("주간보고버튼눌러졋다");
    $(document).get('/b',function(req){
        console,log('mainmain으로 가진다.');

    }); //URL, callback

});

$(document).on("click", "#nchk1", function (e) {
    //찾기


    var re1='.*?';   // Non-greedy match on filler
    var re2='(\\d+)';   // Integer Number 1
    var re3='.*?';   // Non-greedy match on filler
    var re4='(\\d+)';   // Integer Number 2
    console.log($(this).parent().parent().find('#table_list.board_area').children().last().find('#search').attr('name'));
    var p = new RegExp(re1+re2+re3+re4,["i"]);
    var m = p.exec($(this).parent().parent().find('#table_list.board_area').children().last().find('#search').attr('name'));
    if (m != null)
    {
        var int1=m[1];
        var int2=m[2];
        console.log("("+int1.replace(/</,"&lt;")+")"+"("+int2.replace(/</,"&lt;")+")"+"\n");
    }

    var business_number =int1*1;
    console.log(business_number);

    var content_number = int2*1;
    console.log(content_number);
    //복사
    $temp = $(this).parent().parent().find('#table_list.board_area').children().last().clone(true);

    //단계 수정
    $temp.children().eq(1).children().eq(0).children().eq(0).children().eq(0).next().children().eq(0).attr('name','Nextweek['+business_number+']['+(content_number+1)+'][step]');
    //업무내용 수정
    //console.log($temp.children().eq(1).children().eq(0).children().eq(2).children().eq(0).children());
    $temp.children().eq(1).children().eq(0).children().eq(2).children().eq(0).children().attr('name','Nextweek['+business_number+']['+(content_number+1)+'][content]');
    $temp.children().eq(1).children().eq(0).children().eq(2).children().eq(0).children().val("");
    console.log($temp.children().eq(1).children().eq(0).children().eq(2).children().eq(0).children());
    //기간 수정
    $temp.children().eq(1).children().eq(0).children().eq(4).children().eq(0).children().attr('name','Nextweek['+business_number+']['+(content_number+1)+'][term]');
    $temp.children().eq(1).children().eq(0).children().eq(4).children().eq(0).children().val("");
    //세부내용 수정
    $temp.children().eq(1).children().eq(0).children().eq(6).children().eq(0).children().attr('name','Nextweek['+business_number+']['+(content_number+1)+'][detail]');
    $temp.children().eq(1).children().eq(0).children().eq(6).children().eq(0).children().val("");
    //붙이기
    $(this).parent().parent().find('#table_list.board_area').children().last().after($temp);

});

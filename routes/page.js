const express = require(`express`);
const router = express.Router();
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const {User,BusinessInfo,Thisweek_task,Nextweek_task,Nextweek_detailtask,Thisweek_detailtask,Vacation,Businesstrip,Issue} = require('../models')

let name = "";
let position = "";
let teamname = "";

let term = "";

router.get(`/a`, async(req, res, next) => {
    //console.log(req.body.this_week_Task)
    const businfo = await BusinessInfo.findAll({});
    res.render('mainmain', {
        user : req.user,
        businfos : businfo,
    });
    //console.log('-------------------'+res+'로 가진다');
});
router.get(`/b`, async(req, res, next) => {
    //console.log(req.body.this_week_Task)
    const businfo = await BusinessInfo.findAll({});
    res.render('mainmain', {
        user : req.user,
        businfos : businfo,
    });
    //console.log('-------------------'+res+'로 가진다');
});

router.get(`/`, async(req, res, next) => {
    //console.log(req.body.this_week_Task)
    const businfo = await BusinessInfo.findAll({});
    res.render('mainmain', {
        user : req.user,
        businfos : businfo,
        errormessage : '',
        loginError: req.flash('loginError'),
    });
    //console.log('-------------------'+res+'로 가진다');
});
router.get(`/main`, async(req, res, next) => {
    const businfo = await BusinessInfo.findAll({});
    res.render('main', {
        user : req.user,
        businfos : businfo,
    });
});
router.get(`/:busid`, (req, res, next) => {
    console.log(req.params.busid);
    if (req.params.busid === 'bussiness1') {
        name = "홍길동";
        teamname = "1번팀";

        term = "이번주";
        position = "신입사원";
        res.redirect('/');
    }
    if (req.params.busid === 'bussiness2') {
        name = "정상인";
        teamname = "2번팀";

        term = "다음주";
        position = "사장님";
        res.redirect('/');
    }
    if (req.params.busid === 'bussiness3') {
        name = "제임스";
        teamname = "3번팀";

        term = "다음주";
        position = "사장님";
        res.redirect('/');
    }

});
router.post(`/send`, isLoggedIn,(req, res, next) => {

    /*if (req.body.xx.length !== 1){
        for (let i = 0; i < req.body.zz.length; i++) {
            console.log(req.body.zz[i]);
            console.log(req.body.xx[i]);
            console.log(req.body.yy[i]);
        }
    }else{
        console.log(req.body.zz);
        console.log(req.body.xx);
        console.log(req.body.yy);
    }*/
    res.json({ status: '201', message: "보고가 완료되었습니다." });

});
router.post(`/send`, isLoggedIn,(req, res, next) => {

    /*if (req.body.xx.length !== 1){
        for (let i = 0; i < req.body.zz.length; i++) {
            console.log(req.body.zz[i]);
            console.log(req.body.xx[i]);
            console.log(req.body.yy[i]);
        }
    }else{
        console.log(req.body.zz);
        console.log(req.body.xx);
        console.log(req.body.yy);
    }*/
    res.json({ status: '201', message: "보고가 완료되었습니다." });

});
router.post('/sendall',async (req,res,next)=>{

    console.log(req.body);

    //--------------이번주사업----------------------//
   req.body.data.Thisweek = req.body.data.Thisweek.filter(obj=>{
    return obj!==null?true:false;
    } );
   console.log('이번주 사업의 개수는',req.body.data.Thisweek.length,'입니다');
    for(let i=0;i<req.body.data.Thisweek.length;i++){
        //각각의 사업마다 처리해줘야하는 함수
        req.body.data.Thisweek[i] = req.body.data.Thisweek[i].filter(obj=>{
            return obj!==null?true:false;
        } );

        console.log(`${i}번째 사업의 업무 개수는 ${req.body.data.Thisweek[i].length} 입니다.`);
        for(let j=0;j<req.body.data.Thisweek[i].length;j++)
        {

            if(j===0){
                console.log(`${i}번째 사업의 정보는 : `,req.body.data.Thisweek[i][j]);
                await Thisweek_task.create({
                    business_name : req.body.data.Thisweek[i][j].businessname,
                    term : '',
                    place : req.body.data.Thisweek[i][j].place,
                    writer : req.body.id,
                })
                .then((temp)=>{
                  temp1=temp.id*1;
                  console.log("--------------------");
                  console.log(temp1);
                });
                console.log("******************");
                console.log(temp1);
                continue;
            }

            console.log(`${i}번째 사업의 ${j}업무는 `,req.body.data.Thisweek[i][j],'입니다.');
            //console.log('템프는',temp);
            await Thisweek_detailtask.create({
                step : req.body.data.Thisweek[i][j].step,
                task_content : req.body.data.Thisweek[i][j].content,
                term : req.body.data.Thisweek[i][j].term,
                detail_content : req.body.data.Thisweek[i][j].detail,
                detail_writer : req.body.id,
                business_number : temp1,
            });
        }
    }
    //--------------이번주사업----------------------//

    //--------------다음주사업----------------------//
    req.body.data.Nextweek = req.body.data.Nextweek.filter(obj=>{
    return obj!==null?true:false;
    } );
    console.log('다음주 사업의 개수는',req.body.data.Nextweek.length,'입니다');
    for(let i=0;i<req.body.data.Nextweek.length;i++){
        //각각의 사업마다 처리해줘야하는 함수
        req.body.data.Nextweek[i] = req.body.data.Nextweek[i].filter(obj=>{
            return obj!==null?true:false;
        } );

        console.log(`${i}번째 사업의 업무 개수는 ${req.body.data.Nextweek[i].length} 입니다.`);
        for(let j=0;j<req.body.data.Nextweek[i].length;j++)
        {
          if(j===0){
              console.log(`${i}번째 사업의 정보는 : `,req.body.data.Nextweek[i][j]);
              await Nextweek_task.create({
                  business_name : req.body.data.Nextweek[i][j].businessname,
                  term : '',
                  place : req.body.data.Nextweek[i][j].place,
                  writer : req.body.id,
              })
              .then((temp)=>{
                temp1=temp.id*1;
                console.log("--------------------");
                console.log(temp1);
              });
              console.log("******************");
              console.log(temp1);
              continue;
          }

          console.log(`${i}번째 사업의 ${j}업무는 `,req.body.data.Nextweek[i][j],'입니다.');
          //console.log('템프는',temp);
          await Nextweek_detailtask.create({
              step : req.body.data.Nextweek[i][j].step,
              task_content : req.body.data.Nextweek[i][j].content,
              term : req.body.data.Nextweek[i][j].term,
              detail_content : req.body.data.Nextweek[i][j].detail,
              detail_writer : req.body.id,
              business_number : temp1,
          });
        }
    }

    //--------------다음주사업----------------------//

    //--------------휴가----------------------//
    req.body.data.vacation = req.body.data.vacation.filter(obj=>{
        return obj!==null?true:false;
    } );
    for(let k=0;k<req.body.data.vacation.length;k++){
        console.log(k,': 번째 휴가  : ',req.body.data.vacation[k]);
        if(req.body.data.vacation[k].type!==''){
          Vacation.create({
              type:req.body.data.vacation[k].type,
              start_date:req.body.data.vacation[k].start_date,
              end_date:req.body.data.vacation[k].end_date,
              reason:req.body.data.vacation[k].reason,
              vacationuser : req.body.id,
            })

        .catch((error)=>{
            console.log(error);
        })
      }
    }

    //--------------휴가----------------------//

    //--------------출장----------------------//
    req.body.data.bustrip = req.body.data.bustrip.filter(obj=>{
         return obj!==null?true:false;
     } );
     for(let k=0;k<req.body.data.bustrip.length;k++){
       if(req.body.data.bustrip[k].type!==''){
         Businesstrip.create({
             type:req.body.data.bustrip[k].type,
             place:req.body.data.bustrip[k].place,
             start_date:req.body.data.bustrip[k].start_date,
             end_date:req.body.data.bustrip[k].end_date,
             reason:req.body.data.bustrip[k].reason,
             bustripuser : req.body.id,
         })
         .catch((error)=>{
             console.log(error);
         })
       }
     }

    //--------------출장----------------------//
    //--------------이슈----------------------//
    if(req.body.data.issue!==''){
    await Issue.create({
        content:req.body.data.issue,
        writer:req.body.id,
    })
    .catch((err)=>{
      console.log(err);
    })
  }
    //--------------이슈----------------------//
});



module.exports = router;

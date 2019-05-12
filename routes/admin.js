const express = require('express');
const {User,BusinessInfo,Thisweek_task,Thisweek_detailtask,Vacation,Businesstrip,Nextweek_task,Nextweek_detailtask,Issue} = require('../models');

const router = express.Router();

var bus_count=1;

router.get(`/`, async(req, res, next) => {
    const businfo = await BusinessInfo.findAll({});
    const user = await User.findAll({
    });
    const teaminfo = user.map(i => i.teamname);
    console.log('-------------------------------------------------------------------',req.user);
    var uniq = teaminfo.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
      },[]);
    if(req.user.email==='j@naver.com'&&req.user.password==='1'){
        res.render('admin', {
            user : req.user,
            businfos : businfo,
            teaminfos : uniq,
            vacations : '',
            bus_counts : bus_count,
        });

    }
    else{
        res.render('mainmain', {
            user : req.user,
            businfos : businfo,
            errormessage :'관리자 권한이 없습니다!!',
        });
        console.log('-------------------------------------oaky');
    }
});
router.get('/issue',(req,res,next)=>{
    Issue.findAll({
        include : {
            model : User,
        },
       
    })
    .then((issues)=>{
        res.json(issues);
    })
    .catch((err)=>{
        console.error(err);
    });
});
router.get('/participants/:businessid/:teamname',async (req,res,next)=>{

    var today = new Date();
    var day = today.getDay();
    var time = today.getTime();
    var gap = -(day-1);
    var result = [];
    var num=0;
    for(j=gap; j<gap+9; j++) {

    newtime = time + (3600000 * (24*j));
    today.setTime(newtime);
    result[num] = setDate(today);
    num++;

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


    const temp = decodeURIComponent(req.params.teamname);
    await Thisweek_task.findAll({
        where : {
            business_name : req.params.businessid,
            createdAt: {between: [result[0], result[7]]}
        },
        include : {
            model :User,
            where : {
                teamname : temp,

            },
            attributes : ['name'],
        },
        distinct : 'writer',


    })
    .then((participants)=>{
        const username = participants.map(i => i.user.name);
        if(username){
        res.json(username);
        }else{
         res.json({asd:'안됨'});
        }

    })

});
router.get('/details/:name/:busid',(req,res,next)=>{
    const name = decodeURIComponent(req.params.name);
    console.log('서버에서 받은 name과 사업아이디는 : ',name , req.params.busid);

        Thisweek_detailtask.findAll({
            attributes : ['task_content','term'],
            where : {
            },
            include :
            [{
                model : User,
                where :
                {
                    name : name
                },
                attributes :['name'],
            },
            {
                model : Thisweek_task,
                attributes :['place'],
                where :{
                    business_name : req.params.busid
                }
            }]
        })
        .then((result)=>{
            res.json(result);
        });
});
router.get('/taskkcontents/:businessid',async(req,res,next)=>{
    //console.log('()id값은 ',req.params.businessid);
    await Thisweek_detailtask.findAll({
        where:{
        },
        include:{
            model:Thisweek_task,
            where : {
                business_name : req.params.businessid,
            }
        },
        attributes : ['task_content'],
    })
    .then((taskkcontents)=>{
        const task_C = taskkcontents.map(i => i.task_content);
        //console.log('결과값 : ' ,task_C);
        res.json(task_C);
    })

});
router.get('/participants/:businessid/:teamname',async (req,res,next)=>{

    console.log()
    const temp = decodeURIComponent(req.params.teamname);
    await Thisweek_task.findAll({
        where : {
            business_name : req.params.businessid,
        },
        include : {
            model :User,
            where : {
                teamname : temp,
            },
            attributes : ['name'],
        },
        distinct : 'writer',
    })
    .then((participants)=>{
    const username = participants.map(i => i.user.name);

        res.json(username);
    })
    //);

});
router.get('/thisweek',(req,res,next)=>{
    Thisweek_detailtask.findAll({
        include:[{
            model:User
        },{
            model:Thisweek_task
        }
        ]
    })
    .then((thisweek)=>{
      //console.log(thisweek);
        res.json(thisweek);
    })
    .catch((err)=>{
        console.error(err);
    });
});
router.get('/details/:name/:busid',(req,res,next)=>{
    const name = decodeURIComponent(req.params.name);
    console.log('서버에서 받은 name과 사업아이디는 : ',name , req.params.busid);

        Thisweek_detailtask.findAll({
            attributes : ['task_content','term'],
            where : {
            },
            include :
            [{
                model : User,
                where :
                {
                    name : name
                },
                attributes :['name'],
            },
            {
                model : Thisweek_task,
                attributes :['place'],
                where :{
                    business_name : req.params.busid
                }
            }]
        })
        .then((result)=>{
            res.json(result);
        });
});
router.get('/vacation',(req,res,next)=>{
    Vacation.findAll({
        include : {
            model : User,
        },
        order : [['start_date', 'DESC'],],
    })
    .then((vacations)=>{
        res.json(vacations);
    })
    .catch((err)=>{
        console.error(err);
    });
});
router.get('/business_trip',(req,res,next)=>{
    Businesstrip.findAll({
        include :{
            model : User,
        },
    })
    .then((Businesstrips)=>{
        res.json(Businesstrips);
    })
    .catch((err)=>{
        console.error(err);
    });
});
router.get('/participants1/:businessid/:teamname',async (req,res,next)=>{
    var today = new Date();
    var day = today.getDay();
    var time = today.getTime();
    var gap = -(day-1);
    var result = [];
    var num=0;
    for(j=gap; j<gap+9; j++) {

    newtime = time + (3600000 * (24*j));
    today.setTime(newtime);
    result[num] = setDate(today);
    num++;

    }
    console.log(" ");
    console.log(" ");console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(result[0]);
    console.log(result[7]);
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

    const temp = decodeURIComponent(req.params.teamname);
    await Nextweek_task.findAll({
        where : {
            business_name : req.params.businessid,

        },
        include : {
            model :User,
            where : {
                teamname : temp,
            },
            attributes : ['name'],
        },
        distinct : 'writer',
    })
    .then((participants)=>{
        const username = participants.map(i => i.user.name);
        res.json(username);
    })
});
router.get('/details1/:name/:busid',(req,res,next)=>{
    const name = decodeURIComponent(req.params.name);
        Nextweek_detailtask.findAll({
            attributes : ['task_content','term'],
            where : {
            },
            include :
            [{
                model : User,
                where :
                {
                    name : name
                },
                attributes :['name'],
            },
            {
                model : Nextweek_task,
                attributes :['place'],
                where :{
                    business_name : req.params.busid
                }
            }]
        })
        .then((result)=>{
            console.log('다음주내용',result);

            res.json(result);
        });

});
module.exports = router;

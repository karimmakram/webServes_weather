const express = require('express')
const path =require('path')
const hbs = require('hbs');
const geocode = require('./utilte/geocode')
const forecast = require('./utilte/forcast')

// express configration
const app =express()
const Dir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../tempaletes/views')
const partialPath = path.join(__dirname,'../tempaletes/partials')


//set handlbar action and views location
app.set('view engine' , 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


app.use(express.static(Dir))

//router
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather APP",
        name:'karim makram'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About my APP",
        name:'karim makram'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"We can help follow by.....",
        name:'karim makram'
    })
})

app.get('/weather',(req,res)=>{
    if(req.query.address){
        geocode(req.query.address,(error,{placeName,latitude,longtude}={})=>{
            if(error){
                res.send({
                    error:error
                })
            }
            else{
                forecast(latitude,longtude,(error,data)=>{
                    if(error){
                        res.send({
                            error:error
                        })
                    }else{
                        res.send(
                                {
                                    place:placeName,
                                    features:data,
                                    location:req.query.address
                                }
                            )
                    }
            }
        )}
    })
    }
    else{
        res.send([
            {
                error:"you must provide your address"
            }
        ])
    }
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help Error',
        error:'help artical not found',
        name:'karim'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        error:'page not found',
        name:'karim'
    })
})

app.listen(3000,()=>{
    console.log('Running');
})
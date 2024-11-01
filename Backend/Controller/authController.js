const User = require("../models/userModel");
var passwordHash = require("password-hash");

const login = (req,res)=>{
    const body = req.body;
    console.log("body",body);
    
      User.findOne({email:body?.email})

    .then((user)=>{
                                  //code when we dont hash pasword
        //res.send({
        //                message:"Login Successfull",
        //                user:user,
        //            })
        if(user){
            const isValidPassword = passwordHash.verify('body.password',user.password);
        if(isValidPassword){
            res.send({
                message:"Login Successfull",
                user:user,
            })
        }else{
            res.status(500).send({
                message:"invalid password please enter valid password",
                user:null,
            })
        }
    }else{
            res.status(500).send({
                message:"user not found, please signup first",
                user:null
            })
        }

    })
    .catch((err)=>{
        console.log("error:",err);
    })

}


const signup =(req,res)=>{
const body = req.body;

const hashedPassword = passwordHash.generate('body.password');
console.log("hashedPassword",hashedPassword)

const newUser = new User({
    email:body.email,
    password: hashedPassword,
    name:body.name,
})
newUser
.save()
.then((user)=>{
    console.log("user:",user);
    
    res.send({
        message:"Signup Successfull",
        user,
    })
})
.catch((err)=>{
    console.log("error:",err);
    if(err.message.includes("duplicate key")){
        res.status(500).send({
            message:"Email already exists, please enter different email",
        });
    }else{
        res.status(500).send({
            message:err.message,
            error:err,
        })
    }
})
}


const updateProfile=(req,res)=>{
    const body = req.body;

    User.findByIdAndUpdate(body.id,{
        name: body.name,
        profile: body.profile,
        contact: body.contact,
        age: body.age,
        address: body.address,
        about: body.about,
    },
{new:true,}
)

.then((user)=>{
    if(user){
    res.send({
        message:"Profile Updated Successfully",
        user
    })
}else{
    res.status(500).send({
        message:"something went wrong, please try again"
    })
}
})
.catch((err)=>{
    res.status(500).send({
        message:err.message,
        error:err,
    })
})

}

module.exports = { login, signup ,updateProfile};

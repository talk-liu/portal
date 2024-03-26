module.exports={
    Query:{
        registerGeetest(root, {}, ctx){
            return ctx.connector.geetest.registerGeetest();
        }
    }
}
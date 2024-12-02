const paypal=require('paypal-rest-sdk');

paypal.configure({
    mode:'sandbox',
    client_id:process.env.PAYPAL_CLIENT_ID,
        // 'Ab8nWkH8_H4JHMDGfCI0qpMcYbRVxq8h0IMEBmletXLWItHxlVwKHj3BbJlwCCH2qyclF4ggigUHVaSc',
    client_secret:process.env.PAYPAL_CLIENT_SECRET,
        // 'EDADWvg50kO62JNS2HYHkoD_bid4ovkBlUPtCqEtFlAcUAfbXexNm74tAl8hbVPJmUYsCvOl5oS7OV-4'
})

module.exports=paypal
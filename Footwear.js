
// This is where the button for the add to cart is at 
function Cart(){
    var cartnum = document.getElementById("amountitem").innerHTML;
    cartnum = parseInt(cartnum)+1;
    //Thix is the id created to add to console to give output to amount item
    console.log(cartnum);
    document.getElementById("amountitem").innerHTML=cartnum;
    
}
// THis is the button for the bid 
function Counterbid(){
    var bidnum=
        // allows you to bid and output be shown above 
        document.getElementById("counterbid").value;
    document.getElementById("BID").innerHTML=bidnum;
}
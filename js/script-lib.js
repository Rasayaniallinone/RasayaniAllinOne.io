var myCurrentReq=document.getElementById("myscriptLib").getAttribute("myCustomAttrib"),map={},dm="https://0yjorrb4l0.execute-api.ap-south-1.amazonaws.com/",context=dm+"dev/"+myCurrentReq+"/",contextCommon=dm+"dev/common/",category=myCurrentReq.charAt(0).toUpperCase(),typeName=category+myCurrentReq.substr(1),fetchMethod="getAll"+typeName+"Products",successUrl=typeName+"index.html",saveMethod="save"+typeName+"Orders",masterMethod="get"+typeName+"MasterData",minOrder,finalCPrice;function initMap(t){$("#lodaingModal").modal("show"),$.ajax({type:"POST",url:context+fetchMethod,success:function(e){$(e).each(function(){map[$(this).attr("productId")]=$(this).attr("productName")+","+$(this).attr("stockStatus")+","+JSON.stringify($(this).attr("productDetailsList"))}),"H"==t&&generateProduct(),localStorage.setItem(myCurrentReq+"mymap",JSON.stringify(map)),setTimeout(hidePopup,500)},error:function(t){setTimeout(hidePopup,500),alert(t)}})}function hidePopup(){$("#lodaingModal").modal("hide")}function cardCount(){var t=0,e=localStorage.getItem(myCurrentReq+"card");null!=e&&$.each(e.split(","),function(e,a){"null"!=a&&""!=a&&""!=a.split("#")[0]&&t++}),$(".cardCount").html("["+t+"]")}function addtoCard(t,e){var a=t+"#"+$("#qtyID"+t).val()+"#"+$("#catgID"+t).find(":selected").attr("data-id");return localStorage.setItem(myCurrentReq+"card",localStorage.getItem(myCurrentReq+"card")+","+a),alert(map[t].split(",")[0]+" successfully added to cart."),cardCount(),!1}cardCount();var isCoupancase="N",f="";function mainTotal(t){$.ajax({type:"POST",url:context+"calcRebInt",data:'{"coupan":"'+$("#coupontxt").val()+'","carddetails":"'+localStorage.getItem(myCurrentReq+"card").substr(5)+'"}',success:function(e){$("#finalTotal").html($(e)[0]+" Rs"),$("#disc").html($(e)[1]+" Rs"),$("#deliveryCharge").html($(e)[2]+" Rs"),$("#mainTotal").html($(e)[3]+" Rs"),$("#deliveryDesc").html($(e)[5]),finalCPrice=$(e)[3],minOrder=$(e)[4],"Y"==t&&("Y"==$(e)[6]?(isCoupancase="Y",alert("Coupon Code Added Successfully")):(isCoupancase="N",alert("Sorry No Coupon found")))},error:function(t){$("#lodaingModal").modal("hide"),$("#closeButton").show(),alert(t)}}),$.getJSON("https://ipapi.co/json/",function(t){f="IP:"+$(t).attr("ip")+", City:"+$(t).attr("city")+", Region:"+$(t).attr("region")+", postal:"+$(t).attr("postal")+", latitude:"+$(t).attr("latitude")+", longitude:"+$(t).attr("longitude")+", org:"+$(t).attr("org"),f=btoa(f)})}function removeProduct(t,e){disc=0;var a=localStorage.getItem(myCurrentReq+"card");return a=a.replace(t,""),localStorage.setItem(myCurrentReq+"card",a),$("#sectiondetails"+e).remove(),mainTotal(),cardCount(),!1}function initCart(){map=JSON.parse(localStorage.getItem(myCurrentReq+"mymap")),displayCardDetails(),mainTotal()}function displayCardDetails(){var t="";"A"==category&&(t="display:none");var e=localStorage.getItem(myCurrentReq+"card");null!=e&&$.each(e.split(","),function(e,a){if("null"!=a&&""!=a){var r=a.split("#")[1];null==r&&(r=1);var s=a.split("#")[0];if(""!=s){var i=map[s].substr(map[s].indexOf("{")-1),o=JSON.parse(i);o=$(o).get(a.split("#")[2]);var d=$(o).attr("minPrice")*r,n="return removeProduct('"+a+"',"+e+")",l='<div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated" id="sectiondetails'+e+'"><div class="product"><a href="#" style="text-align: center" class="img-prod"><img class="img-fluid" src="images/product-'+s+'.jpg" alt="Colorlib Template"><div class="overlay"></div></a><div class="text py-3 pb-4 px-3 text-center"><h3><a href="#">'+map[s].substr(0,map[s].indexOf(","))+"</a></h3><h5>"+$(o).attr("productDesc")+'</h5><div class="pricing123"><p class="price"><span class="price-sale" style="'+t+'" >Price - '+$(o).attr("minPrice")+' Rs</span><br><span style="'+t+'" class="price-sale">&nbsp;&nbsp;Quantity - '+r+'</span><br><span class="price-sale" style="'+t+'">&nbsp;&nbsp;Final Price - '+d+' Rs</span><br><span class="price-sale">&nbsp;&nbsp;<input type="button" value="Remove from cart" onclick="'+n+'" class="btn btn-primary"  ></span><span class="total" style="display:none" data-val="'+s+","+r+'" id="totVal'+e+'">'+d+" Rs</span></p></div></div></div></div>";$("#cardDetailsData").append(l)}}})}function checkQty(t){""!=$(t).val()&&($(t).val()>0&&$(t).val()<10||$(t).val("1"))}function generateProduct(){$.map(map,function(t,e){t.split(",")[0];var a=t.split(",")[1],r=t.substr(t.indexOf(",")+1),s=JSON.parse(r.substr(r.indexOf(",")+1)),i="",o="",d="",n="<br> Category <select id='catgID"+e+"' onchange='return calcPrice(this,"+e+")'>",l=0;$(s).each(function(){"D"!=$(this).attr("stockStatus")&&(n=n+"<option data-id='"+$(this).attr("id")+"' data-max='"+$(this).attr("maxPrice")+"' data-dis='"+$(this).attr("discount")+"' data-min='"+$(this).attr("minPrice")+"' value='"+$(this).attr("productDesc")+"'>"+$(this).attr("productDesc")+"</option>",0==l&&(i=$(this).attr("minPrice"),o=$(this).attr("maxPrice"),d=$(this).attr("discount")),l++)}),n+="</select>";var c=t.split(",");if("D"!=a){var u,p="",m="";o!=i&&(p=d,m="status"),u="Y"==a?'<br><span> Quantity <input type="number" id="qtyID'+e+'" value="1" min="1" max="9" onKeyup="return checkQty(this)" size="4" style="margin-bottom: 6px;text-align: center;"></span><input type="button" onClick="return addtoCard('+e+',this)" class="btn btn-primary" value="Add to Cart">':'<br><span class="btn btn-danger">Out of Stock</span>';var v='<div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated productNameClass" data-id="'+c[0]+'" ><div class="product"><a href="#" class="img-prod" style="text-align: center"><img class="img-fluid" src="images/product-'+e+'.jpg" alt="UlweAllinOne" style="height: 200px;width: 200px;"><span id="discountSec'+e+'" class="'+m+'">'+p+'</span><div class="overlay"></div></a><div class="text py-3 pb-4 px-3 text-center"><h3><a href="#">'+c[0]+'</a></h3><div class=""><div class="pricing123"><p class="price"  ><span id="priceSection'+e+'">'+getAmountDesc(o,i,d,e)+'</span><span class="price-sale" >'+n+"</span>"+u+"</p></div></div></div></div></div>";$("#productDetails").append(v)}})}function getAmountDesc(t,e,a,r){var s="";return t==e?(s='<span  class="price-sale" id="maxP'+r+'" >Our Price '+e+" Rs</span>",$("#discountSec"+r).removeClass("status").html("")):(s='<span  class="mr-2 price-dc" id="maxP'+r+'" >MRP '+t+' Rs</span><br><span class="price-sale" id="minP'+r+'" >Our Price '+e+" Rs</span>",$("#discountSec"+r).addClass("status").html(a)),s}function calcPrice(t,e){var a=getAmountDesc($(t).find(":selected").attr("data-max"),$(t).find(":selected").attr("data-min"),$(t).find(":selected").attr("data-dis"),e);$("#priceSection"+e).html(a)}function displaySearchResult(t){""!=$(t).val()?$(".productNameClass").each(function(){-1==$(this).attr("data-id").toLowerCase().indexOf($(t).val().toLowerCase())&&$(this).hide()}):$(".productNameClass").show()}function closePopup(){$("#lodaingModal").modal("hide"),localStorage.removeItem(myCurrentReq+"mymap"),localStorage.removeItem(myCurrentReq+"card"),location.href=successUrl}function applyCoupon(){return mainTotal("Y"),!1}function placeOrder(){if(null==minOrder||null==finalCPrice)return alert("Please add some items in cart before placing order."),!1;if(parseInt(minOrder)>parseInt(finalCPrice))return alert("Sorry you must have minimum order of "+minOrder+" Rs."),!1;if(""==$("#fname").val())return alert("Please enter your Name."),$("#fname").focus(),!1;if(""==$("#streetAddress").val())return alert("Please enter Address."),$("#streetAddress").focus(),!1;if(""==$("#mobileNo").val())return alert("Please enter Mobile Number."),$("#mobileNo").focus(),!1;if(10!=$("#mobileNo").val().length)return alert("Please enter 10 digit Mobile Number."),$("#mobileNo").focus(),!1;if(""==$("#emailid").val())return alert("Please enter emailid."),$("#emailid").focus(),!1;if(1==confirm("Are you sure you want to place order?")){$("#lodaingModal").modal("show"),$("#closeButton").hide();var t={};t.userName=$("#fname").val()+" "+$("#lname").val(),t.address=$("#sector").val()+", "+$("#apartment").val()+", "+$("#streetAddress").val()+", "+$("#city").val()+", "+$("#pincode").val(),t.emailid=$("#emailid").val(),t.mobileNo=$("#mobileNo").val(),t.additionalNote=$("#additionalNote").val(),t.inputdata=f,t.carddetails=localStorage.getItem(myCurrentReq+"card").substr(5),t.coupan="Y"==isCoupancase?$("#coupontxt").val():"",$.ajax({type:"POST",url:context+saveMethod,data:JSON.stringify(t),success:function(t){t+="<br><b>Note:</b> Above information is also send to you, on your EmailID.<br><br>",$("#orderConfirmationContent").html(t),$("#closeButton").show()},error:function(t){$("#lodaingModal").modal("hide"),$("#closeButton").show(),alert(t)}})}}function initMasterRates(){$("#lodaingModal").modal("show");var t='{"password":"'+$("#password").val()+'"}';$.ajax({type:"POST",url:context+masterMethod,data:t,success:function(t){setTimeout(hidePopup,500),generateMaster(t)},error:function(t){setTimeout(hidePopup,500),alert(t.responseJSON)}})}function initOrderDetails(){$("#lodaingModal").modal("show");var t='{"password":"'+$("#password").val()+'"}';$.ajax({type:"POST",url:context+"getOrderHistory",data:t,success:function(t){setTimeout(hidePopup,500),generateDetails(t)},error:function(t){setTimeout(hidePopup,500),alert(t.responseJSON)}})}function displayProfile(){var t='{"password":"'+$("#password").val()+'"}';$.ajax({type:"POST",url:context+"getVendorInfo",data:t,success:function(t){displayProfilePopUp(t)},error:function(t){alert(t.responseJSON)}})}function closeVendorDetails(){$("#vendorModal").modal("hide")}function displayProfilePopUp(t){$("#vendorModal").modal("show"),$("#vendorName").val($(t).attr("vendorName")),$("#mobileNo").val($(t).attr("mobileNo")),$("#emailid").val($(t).attr("emailid")),$("#minOrder").val($(t).attr("minOrder")),$("#discFormula").val($(t).attr("discFormula")),$("#discountDesc").val($(t).attr("discountDesc")),$("#orderDeliverTime").val($(t).attr("orderDeliverTime")),$("#vendorpassword").val($(t).attr("password")),$("#envMode").val($(t).attr("envMode")),$("#idval").val($(t).attr("id")),$("#offerNote").val($(t).attr("offerNote"));var e="";$.each($(t).attr("coupon"),function(t,a){e=e+t+"#"+a+","}),e=e.substr(0,e.length-1),$("#coupon").val(e)}function updateVendorDetails(){var t={};t.vendorName=$("#vendorName").val(),t.mobileNo=$("#mobileNo").val(),t.emailid=$("#emailid").val(),t.minOrder=$("#minOrder").val(),t.discFormula=$("#discFormula").val(),t.discountDesc=$("#discountDesc").val(),t.orderDeliverTime=$("#orderDeliverTime").val(),t.password=$("#vendorpassword").val(),t.envMode=$("#envMode").val(),t.coupon=$("#coupon").val(),t.id=$("#idval").val(),t.offerNote=$("#offerNote").val(),$.ajax({type:"POST",url:context+"saveVendorInfo",data:JSON.stringify(t),success:function(t){alert("Updated sucessfully.")},error:function(t){alert("Error. Please contact support")}})}function generateMaster(t){var e="<input type='button' onclick='return displayProfile();' value='View Update Profile' class='btn btn-primary' />";e+="<table><tr><th>ID</th><th>Product Name</th><th>Status</th><th>Product Description</th><th>Min Price</th><th>Max Price</th><th>Status</th><th>Update</th></tr>";var a=1;$(t).each(function(t,r){e=e+'<tr data-id="'+t+'"><td><input type="text" size="1" data-id="'+$(r).attr("id")+'" id="productId'+t+'" readonly value="'+$(r).attr("productId")+'"></td><td><input id="productName'+t+'" type="text" value="'+$(r).attr("productName")+'"></td><td><input type="text" size="2" id="stockStatusM'+t+'" value="'+$(r).attr("stockStatus")+'"></td><td></td><td></td><td></td><td></td><td><input type="button" class="btn btn-primary" onClick="return updateRow('+t+')" value="Update" /><input type="button" class="btn btn-primary" onClick="return addNewChild('+t+')" value="Add Child Record" /></tr>',$($(r).attr("productDetailsList")).each(function(a,r){e=e+'<tr><td></td><td></td><td></td><td><input class="productdesc'+t+'" type="text" value="'+$(this).attr("productDesc")+'"></td><td><input type="text" class="minVal'+t+'" size="2" value="'+$(this).attr("minPrice")+'"></td><td><input class="maxVal'+t+'" type="text" size="2" value="'+$(this).attr("maxPrice")+'"></td><td><input type="text" size="2" class="stockStatus'+t+'" value="'+$(this).attr("stockStatus")+'"></td></tr>'}),a=$(r).attr("productId")}),$("#orderDetails").html(addNewRow(e,++a))}function addNewRow(t,e){return t=(t=t+'<tr><td><input type="text" size="1" data-id="" id="productId'+e+'" value="'+e+'"></td><td><input id="productName'+e+'" type="text"></td><td><input type="text" size="2" id="stockStatusM'+e+'" ></td><td></td><td></td><td></td><td></td><td><input type="button" class="btn btn-primary" onClick="return updateRow('+e+')" value="Add New Record" /><input type="button" class="btn btn-primary" onClick="return addNewChild('+e+')" value="Add Child Record" /></td></tr>')+'<tr data-id="'+e+'"><td></td><td></td><td></td><td><input class="productdesc'+e+'" type="text" ></td><td><input type="text" class="minVal'+e+'" size="2" ></td><td><input class="maxVal'+e+'" type="text" size="2" ></td><td><input type="text" size="2" class="stockStatus'+e+'" ></td></tr></table>'}function addNewChild(t){var e='<tr><td></td><td></td><td></td><td><input class="productdesc'+t+'" type="text" ></td><td><input type="text" class="minVal'+t+'" size="2" ></td><td><input class="maxVal'+t+'" type="text" size="2" ></td><td><input type="text" size="2" class="stockStatus'+t+'" ></td></tr></table>';$("table > tbody ").find("[data-id='"+t+"']").after(e)}function updateRow(t){$("#lodaingModal").modal("show");var e={};e.password=$("#password").val();var a=0,r="";if($(".productdesc"+t).each(function(){if(" "!=$(".maxVal"+t).eq(a).val()){var e=parseInt($(".maxVal"+t).eq(a).val())-parseInt($(".minVal"+t).eq(a).val());e=0==(e=e/parseInt($(".maxVal"+t).eq(a).val())*100)?" ":Math.trunc(e)+"%"}else e=" ";""!=$(this).val()&&(r=r+$(".minVal"+t).eq(a).val()+"#"+$(".maxVal"+t).eq(a).val()+"#"+$(".stockStatus"+t).eq(a).val()+"#"+e+"#"+$(this).val()+","),a++}),e.details=r.substr(0,r.length-1),e.productName=$("#productName"+t).val(),e.stockStatus=$("#stockStatusM"+t).val()," "!=$(".maxVal"+t).val()){var s=parseInt($("#maxVal"+t).val())-parseInt($("#minVal"+t).val());s=0==(s=s/parseInt($("#maxVal"+t).val())*100)?" ":Math.trunc(s)+"%"}else s=" ";return e.productId=$("#productId"+t).val(),e.id=$("#productId"+t).attr("data-id"),updateTables(JSON.stringify(e),"updateProductMaster","initMasterRates"),!1}function generateDetails(t){$("#orderDetails").html("");var e="",a="",r=1,s="";$(t).each(function(t,i){var o="";"Delivered"!=$(i).attr("orderStatus")&&"Cancelled"!=$(i).attr("orderStatus")&&(o='<select id="statusddval'+r+'"><option value="In-Progress">In-Progress</option><option value="Delivered">Delivered</option><option value="UnReachable">UnReachable</option><option value="Out of Stock">Out of Stock</option><option value="Cancelled">Cancelled</option></select>&nbsp;&nbsp;<input type="button" data-id="'+$(i).attr("id")+'"  data-emailid="'+$($(i).attr("user")).attr("emailid")+'" data-name="'+$($(i).attr("user")).attr("userName")+'" class="btn btn-primary" onclick="return updatestatus(this,'+r+')" value="update" />');var d="<ol>";$($($(i).attr("orderDetailsList"))).each(function(t,e){d=d+"<li>"+$(e).attr("description")+"</li>"}),a!=$(i).attr("datetime").substr(0,10)?(e=e.replace("#runtime#",s),s=(s="")+"<p>"+r+'.<input type="hidden" value="'+d+'" id="datadesc'+r+'" /> <input type="button" data-id='+$(i).attr("id")+'  class="btn btn-primary"  onClick="return viewOrderDetails(this,'+r+')" value="OrderDetails" /> OrderId <b>'+$(i).attr("orderid")+"</b> placed by <b>"+$($(i).attr("user")).attr("userName")+"</b> using Mobile No. <b>"+$($(i).attr("user")).attr("mobileNo")+"</b> with Total amount <b>"+$(i).attr("finalPrice")+" Rs. Address Details :</b> "+$($(i).attr("user")).attr("address")+". having order status <b>"+$(i).attr("orderStatus")+"</b>."+o,e=e+'<div class="col-sm-12"><div class="cart-wrap ftco-animate fadeInUp ftco-animated"><div class="cart-total mb-3"><h3>'+$(i).attr("datetime").substr(0,10)+'</h3><div id="detailssub">#runtime#</div></div></div></div>',a=$(i).attr("datetime").substr(0,10)):s=s+"<p>"+r+'.<input type="hidden" value="'+d+'" id="datadesc'+r+'" /> <input type="button" data-id='+$(i).attr("id")+'  class="btn btn-primary"  onClick="return viewOrderDetails(this,'+r+')" value="OrderDetails" /> OrderId <b>'+$(i).attr("orderid")+"</b> placed by <b>"+$($(i).attr("user")).attr("userName")+"</b> using Mobile No. <b>"+$($(i).attr("user")).attr("mobileNo")+"</b> with Total amount <b>"+$(i).attr("finalPrice")+" Rs. Address Details :</b> "+$($(i).attr("user")).attr("address")+". having order status <b>"+$(i).attr("orderStatus")+"</b>."+o,r++}),e=e.replace("#runtime#",s),$("#orderDetails").append(e)}function viewOrderDetails(t,e){$("#exampleModalLabel").html("Below are Order Details"),$(".modal-body").html($("#datadesc"+e).val()+"</ol>"),$("#lodaingModal").modal("show")}function updatestatus(t,e){var a={};a.category=category,a.password=$("#password").val(),a.masterid=$(t).attr("data-id"),a.status=$("#statusddval"+e).val(),a.name=$(t).attr("data-name"),a.emailid=$(t).attr("data-emailid"),updateTables(JSON.stringify(a),"updateOrderStatus","initOrderDetails")}function updateTables(data,method,call){$.ajax({type:"POST",url:context+method,data:data,success:function(response){alert(response),eval(call+"()")},error:function(t){alert(t)}})}function submitViewOrder(){$("#ordersection").hide(),$.ajax({type:"POST",url:contextCommon+"findOrder",data:'{"orderid":"'+$("#Orderid").val()+'"}',success:function(t){var e="";$("#orderHeader").html("Thanks "+$($(t).attr("user")).attr("userName")+" for placing order with Rasayani online Store."),e=(e=(e=(e=e+"<p> Your order was placed on "+$(t).attr("datetime")+". Order status is <b>"+$(t).attr("orderStatus")+"</b>. </p>")+"<p> Total Amount was  "+$(t).attr("finalPrice")+" Rs, Discount was "+$(t).attr("discount")+" Rs, Delivery charges was "+$(t).attr("deliveryCharge")+" Rs, Coupan Used "+$(t).attr("coupanCode")+", </p>")+"<p> Delivery person will contact you on mobile no "+$($(t).attr("user")).attr("mobileNo")+", or email id "+$($(t).attr("user")).attr("emailid")+". </p>")+"<p> Delivery address is "+$($(t).attr("user")).attr("address")+". </p>",e+="<br><p><b>Below are order details</b></p>",e+="<ol>",$($($(t).attr("orderDetailsList"))).each(function(t,a){e=e+"<li>"+$(a).attr("description")+"</li>"}),e+="</ol></br>",$("#detailssub").html(e),$("#ordersection").show(),category=$($(t).attr("master")).attr("catagory")},error:function(t){alert("Please enter valid Order ID. Order ID is send to you via email and SMS.")}})}function refreshMaster(){$.ajax({type:"POST",url:contextCommon+"refreshMaster",data:JSON.stringify(map),success:function(t){alert(t)},error:function(t){alert("Error. Please contact support")}})}function getOfferAll(){$.ajax({type:"POST",url:contextCommon+"mainOfferSection",data:JSON.stringify(map),success:function(t){$(".offerMarqueNote").html("<p>"+t+"</p>")},error:function(t){}})}function getOfferProduct(){$.ajax({type:"POST",url:context+"productOfferSection",data:JSON.stringify(map),success:function(t){$(".offerMarqueNoteDetails").html("<p>"+t+"</p>")},error:function(t){}})}function submitFeedBack(){if(""==$("#Name").val())return alert("Please enter your Name."),$("#Name").focus(),!1;if(""==$("#phoneNO").val())return alert("Please enter Mobile Number."),$("#phoneNO").focus(),!1;if(""==$("#message").val())return alert("Please enter Feedback / Suggestions."),$("#message").focus(),!1;if(1==confirm("Are you sure you want to submit feedback?")){var t={};t.product=$("#Product").val(),t.name=$("#Name").val(),t.phoneNO=$("#phoneNO").val(),t.message=$("#message").val(),$.ajax({type:"POST",url:contextCommon+"savefeedback",data:JSON.stringify(t),success:function(t){alert("Thank you for your feedback. We will contact you soon"),location.reload()},error:function(t){alert("Error while submitting feedback"),location.reload()}})}}
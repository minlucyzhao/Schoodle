// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(()=>{
  $('#user_info').submit((e)=>{
    console.log('submit works!!')
    e.preventDefault();
    const title=$("#user_info input[name='title']").val();
    const description=$("#user_info input[name='description']").val();
    const date=$("#user_info input[name='date']").val();
    const name=$("#user_info input[name='name']").val();
    const email=$("#user_info input[name='email']").val();
    $.ajax({
    method:'POST',
    url:'/db',
    data:{
      title:title,
      description:description,
      date:date,
      name:name,
      email:email
    }})
  
  })
})

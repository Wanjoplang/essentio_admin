function init_events(){
    // $("h2").on("dblclick",function(e){
    //     $(this).attr("contenteditable",true);
    //     $(this).focus();
    // });
    // $("h2").on("blur",function(e){
    //     $(this).removeAttr("contenteditable");
    // });
    // $("tbody td").on("dblclick",function(e){
    //     $("tbody td").removeAttr("contenteditable");
    //     $(this).attr("contenteditable",true);
    //     $(this).focus();
    // });
    // $("tbody td").on("blur",function(e){
    //     $("tbody td").removeAttr("contenteditable");
    // });
    // $("thead th").on("dblclick",function(e){
    //     $("thead th").removeAttr("contenteditable");
    //     $(this).attr("contenteditable",true);
    //     $(this).focus();
    // });
    // $("thead th").on("blur",function(e){
    //     $("thead th").removeAttr("contenteditable");
    // });
    set_Off("#off1");
    set_Off("#off2");
    set_Off("#off3");
    set_Off("#off4");
    set_Off("#off5");
    set_Off("#off6");
    set_Off("#off7");
    set_Off("#off8");
    user = firebase.auth().currentUser;
    if(user !== null) $("small").text(user.displayName);
    else $("small").text("");
}

function set_Off(offid){
    $(offid).on("blur",function(e){
        if($(this).text()!==""){
            $("#"+$(this).data("col1")).append(", "+$("#"+$(this).data("col2")).text());
            $("#"+$(this).data("col1")).attr("colspan",2);
            $("#"+$(this).data("col2")).hide();
        }
        else{
            $("#"+$(this).data("col1")).text($("#"+$(this).data("col1")).text().replace(", "+$("#"+$(this).data("col2")).text(),""));
            $("#"+$(this).data("col1")).removeAttr("colspan");
            $("#"+$(this).data("col2")).show();
        }
    });
}

function edit_content(){
    if($("#edit").data("edit")==="no"){
        $("#edit").data("edit","yes");
        $("#edit").html("Exit <i class='fas fa-sign-out-alt'></i>");
        $("#edit").removeClass("btn-warning");
        $("#edit").addClass("btn-danger");
        setContentEditable(true);
    }else{
        $("#edit").data("edit","no");
        $("#edit").html("Edit <i class='fas fa-edit'></i>");
        $("#edit").removeClass("btn-danger");
        $("#edit").addClass("btn-warning");
        setContentEditable(false);
    }
    
}

function setContentEditable(bool){
    $("th").attr("contenteditable",bool);
    $("td").attr("contenteditable",bool);
    $("h2").attr("contenteditable",bool);
}

function print_page(){
    $("h5,p").hide();
    window.print();
    $("h5,p").show();
}

function upload(){
    ref.child("html").set($("#roster").html(),function(err){
        if(err){
            alert(err);
            console.log(err);
        }else{
            alert("Roster Uploaded Successfully");
        }
    });
}

db = firebase.database();
ref = db.ref("roster");
ref.once("value",function(snap){
    console.log(snap.val());
    if(snap.val()!==null){
        $("#roster").empty();
        $("#roster").html(snap.val()["html"]);
        init_events();
    }
});

init_events();
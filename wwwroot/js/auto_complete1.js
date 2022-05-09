const { parseJSON } = require("jquery");

function auto_complete1() {
    alert("new");
    this.class_type1 = "auto_complete1";
    this.input_id = "";
    this.text_of_input = "";
    this.last_over_tr_id = null;
    this.current_ind1 = -1;
    this.count_tr_rows1 = -1;
    this.name_auto_complete_obj1 = "";//name of auto_complete1 object that exist in the html page in jscript
    this.init = auto_complete1__init;

    this.input_click_func = auto_complete1__input_click_func;
    this.tr_click_func = auto_complete1__tr_click_func;
    this.input_keyup_func = auto_complete1__input_keyup_func;
    this.change_selected_tr = auto_complete1__change_selected_tr;
    this.mouseover_func = auto_complete1__mouseover_func;
    this.update_input_text_val = auto_complete1__update_input_text_val;
    this.call_back1 = null;

    function auto_complete1__init() {
        $("#" + this.input_id).attr("name_auto_complete_obj1", this.name_auto_complete_obj1);
        var this1 = this;
        $("#" + this.input_id).keyup(function (e1) { this1.input_keyup_func(e1, this1); });
        $("#" + this.input_id).click(function (e1) { this1.input_click_func(e1, this1); });
        //$("#" + this.input_id).keyup(auto_complete1__input_keyup_func);
    }

    function auto_complete1__input_click_func() {
        //alert("click1");
    }


    function auto_complete1__input_keyup_func(e1/*,this1*/) {
        var this1 = this;

        //alert(e1.which);
        //alert("this1.");
        
        //alert($(e1.target).attr("placeholder"));
        //$(e1.target)=this
        //var this1 = null;
        //alert($(e1.target).attr("name_auto_complete_obj1"));

        //this1 = 2;
        //eval("this1=2");
        var str_js1 = "this1=" + $(e1.target).attr("name_auto_complete_obj1");
        //alert("str_js1=[" + str_js1 + "]");
        //eval(str_js1);

        //this1 = get_code_obj_by_name($(e1.target).attr("name_auto_complete_obj1"));

        var key_char1=$("#" + this1.input_id).val();
        if ($("#" + this1.input_id + "_autocomp_options").length > 0) {
            if (e1.which == 38) {//up
                this1.change_selected_tr("up1");
                return;
            }
            if (e1.which == 40) {//down
                add_to_log1('down');
                this1.change_selected_tr("down1");
                return;
            }
        }

        add_to_log1('build');

        //$(e1.target).attr("placeholder")
        //this1 is the object of auto_complete1 that exist in the html page jscript

        //alert(this1.input_id);
        //alert("keyup1");
        this1.json_obj1 = null;
        try {
            $.ajaxSetup({ async: false });
            $.post("./service/search_results1", { autocomp_val: key_char1 }, function (msg1) {
                //alert("msg1=" + msg1);

                this1.json_obj1 = $.parseJSON(msg1);
                //window.location.href="./Home/index";

                //return false;
            });


            /*$.post("/home/search_results1", null, function (msg1) {
                //alert(msg1);

                this1.json_obj1 = $.parseJSON(msg1);
            });*/

            //alert(json_obj1["results_arr"][0]["id"]);
            var top1 = $("#" + this1.input_id).offset().top + parseInt($("#" + this1.input_id).outerHeight());
            //alert(top1);
            var left1 = $("#" + this1.input_id).offset().left;




            var html_str = "<table type1='tbl_autocomp1' name_auto_complete_obj1='" + this1.name_auto_complete_obj1+"' id='" + this1.input_id+"_autocomp_options' style='background-Color:#ffccff;position:absolute;top:" + top1 + "px;left:" + left1 + "px;z-index:300'>";

            var i1;

            for (i1 = 0; i1 < this1.json_obj1["results_arr"].length; i1++) {
                html_str += "<tr type1='tr_autocomp_opt1' ind1='" + i1 + "' id_json_row='" +this1.json_obj1["results_arr"][i1]["id"]+"' id='" + this1.input_id + "_opt_" + i1 + "'>";
                html_str += "<td><img style='width:40px' src='" + this1.json_obj1["results_arr"][i1]["img"] + "' /></td>";
                html_str += "<td type1='name_autocomp_opt1' >" + this1.json_obj1["results_arr"][i1]["name"] + "</td>"
                html_str += "</tr>";
            }
            html_str += "</table>";

            this1.count_tr_rows1 = this1.json_obj1["results_arr"].length;
            //alert($("#" + this1.input_id).offset().top);
            $("#" + this1.input_id + "_autocomp_options").unbind('mouseover');
            $("#" + this1.input_id + "_autocomp_options").remove();

            $("#" + this1.input_id + "_autocomp_options").unbind('click');
            $(document.body).append($(html_str));
            
            $("#" + this1.input_id + "_autocomp_options").click(function (e1) { this1.tr_click_func(e1, this1) });

            //$("#" + this1.input_id + "_autocomp_options").mouseover(auto_complete1__mouseover_func);
            //var this2 = this1;
            $("#" + this1.input_id + "_autocomp_options").mouseover(function (e1) { this1.mouseover_func(e1, this1) });
            //$("#" + this.input_id).click(auto_complete1__input_click_func);
            $("#log_txt1").html("ok\r\n" + $("#log_txt1").html());

            this1.text_of_input = $("#" + this1.input_id).val();
            $("#" + this1.input_id).attr("autocomplete", "off");
            this1.current_ind1 = -1;
            //alert(this1.call_back1);
            this1.call_back1();
            //----

        }
        catch (ex1) {
            alert(ex1);
        }
    }

    function auto_complete1__tr_click_func(e1,this1) {
        add_to_log1("auto_complete1__tr_click_func");
        var obj1 = $(e1.target);
        var c1 = 0;
        while (obj1.attr("type1") != "tr_autocomp_opt1" && c1 < 4) {
            //add_to_log1("c1="+c1+","+obj1.html());
            obj1 = obj1.parent();
            c1++;
        }

        var tbl_obj1 = obj1;
        c1 = 0;
        while (tbl_obj1.attr("type1") != "tbl_autocomp1" && c1 < 4) {
            //add_to_log1("c1="+c1+","+obj1.html());
            tbl_obj1 = tbl_obj1.parent();
            c1++;
        }

        //var str_js1 = "this1=" + tbl_obj1.attr("name_auto_complete_obj1");
        //alert("str_js1=[" + str_js1 + "]");


        //this1 = get_code_obj_by_name(tbl_obj1.attr("name_auto_complete_obj1"));


        $("#" + this1.input_id + "_autocomp_options").remove();

    }
    function auto_complete1__get_code_obj1(obj1) {

    }

    function auto_complete1__change_selected_tr(dir1) {
        if (dir1 == "down1") {
            this.current_ind1++;
            if (this.current_ind1 == this.count_tr_rows1) {
                this.current_ind1 = -1;
            }
            add_to_log1("current_ind1=" + this.current_ind1);
        }
        if (dir1 == "up1") {
            this.current_ind1--;
            if (this.current_ind1 == -2) {
                this.current_ind1 = this.count_tr_rows1-1;
            }

        }
        add_to_log1("dir1=" + dir1);
        var cur_obj1 = $("#" + this.input_id + "_opt_" + this.current_ind1);
        cur_obj1.css("background-Color", "#ffffff");


        if (this.last_over_tr_id != null) {
            $("#" + this.last_over_tr_id).css("background-Color", "#ffccff");

        }
        this.last_over_tr_id = cur_obj1.attr("id");
        add_to_log1("ind1=" + parseInt(cur_obj1.attr("ind1")));
        add_to_log1(this.text_of_input);
        this.update_input_text_val();
    }

    function auto_complete1__update_input_text_val() {

        add_to_log1("auto_complete1__update_input_text_val," + this.current_ind1);
        if (this.current_ind1 == -1) {
            $("#" + this.input_id).val(this.text_of_input);

        }
        else {
            $("#" + this.input_id).val(this.json_obj1["results_arr"][this.current_ind1]["name"]);

        }

    }
    function auto_complete1__mouseover_func(e1,this1) {
        /*if ($(e1.target).attr("type1") != "tr_autocomp_opt1") {
            return;
        }*/



        



        var obj1 = $(e1.target);
        var c1 = 0;
        while (obj1.attr("type1") != "tr_autocomp_opt1" && c1 < 4) {
            //add_to_log1("c1="+c1+","+obj1.html());
            obj1 = obj1.parent();
            c1++;
        }
        var tbl_obj1 = obj1;
        c1 = 0;
        while (tbl_obj1.attr("type1") != "tbl_autocomp1" && c1 < 4) {
            //add_to_log1("c1="+c1+","+obj1.html());
            tbl_obj1 = tbl_obj1.parent();
            c1++;
        }

        //var str_js1 = "this1=" + tbl_obj1.attr("name_auto_complete_obj1");
        //alert("str_js1=[" + str_js1 + "]");


        //this1 = get_code_obj_by_name(tbl_obj1.attr("name_auto_complete_obj1"));




        add_to_log1("tbl_obj1_id="+tbl_obj1.attr("id"));
        /*if ($(e1.target).attr("type1") != "name_autocomp_opt1") {
            return;
        }*/
        //alert($(obj1).html());
        add_to_log1(obj1.attr("id") + "," + obj1.attr("type1"));
        if (obj1.attr("type1") == "tr_autocomp_opt1") {
            if (this1.last_over_tr_id == obj1.attr("id")) {
                return;
            }
            obj1.css("background-Color", "#ffffff");
            if (this1.last_over_tr_id != null) {
                $("#" + this1.last_over_tr_id).css("background-Color", "#ffccff");

            }
            this1.last_over_tr_id = obj1.attr("id");
            this1.current_ind1 = parseInt(obj1.attr("ind1"));
            add_to_log1("this1.last_over_tr_id=" + this1.last_over_tr_id);
            this1.update_input_text_val();
        }
        
       
        /*if (obj1.attr("type1") != "tr_autocomp_opt1") {
            obj1.css("background-Color", "#ffccff");
        }*/

        //$("#log_txt1").html($(e1.target).html()+"\r\n" + $("#log_txt1").html());
        //$("#log_txt1").html("auto_complete1__mouseover_func\r\n" + $("#log_txt1").html());
    }
}
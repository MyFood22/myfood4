
// JScript File
function drop_list_pre_class1() {
    this.drop_list_pre_id = null;
    this.drop_list_input_obj1 = null;

    this.read_data_func = null;

    this.init_drop_list_pre = drop_list_pre__init_drop_list_pre;
    this.key_up = key_up_drop_list_pre;
    this.parse_text_obj1 = null;
    this.build_list = drop_list_pre__build_list;
    this.data_list_xml_obj1 = null;
    this.table_obj1 = null;
    function drop_list_pre__init_drop_list_pre() {
        $(this.drop_list_input_obj1).keyup(this.key_up);
    }

    function key_up_drop_list_pre(event1) {
        //debugger;
        var code_obj1 = get_drop_list_pre_code_obj();
        var prefix_str = $(code_obj1.drop_list_input_obj1).attr("value");
        var data_list_str = code_obj1.read_data_func(prefix_str);
        code_obj1.data_list_xml_obj1 = $.xmlDOM(data_list_str);
        var id_tag = code_obj1.parse_text_obj1.get_tag_name_by_ref(code_obj1.data_list_xml_obj1, "id");
        var text_tag = code_obj1.parse_text_obj1.get_tag_name_by_ref(code_obj1.data_list_xml_obj1, "text");

        code_obj1.build_list();
    }

    function drop_list_pre__build_list() {
        //debugger;
        var node_list1 = this.data_list_xml_obj1.find("r[r='y']");
        var table_str1 = "<table>";
        var text_tag = this.parse_text_obj1.get_tag_name_by_ref(this.data_list_xml_obj1, "text");
        var i1;
        for (i1 = 0; i1 < node_list1.length; i1++) {
            var text1 = $(node_list1.get(i1)).find(text_tag).attr("s");
            var tr_str1 = "<tr><td>" + text1 + "</td></tr>";
            table_str1 += tr_str1;
        }
        table_str1 += "</table>";
        var parent_obj1 = $(this.drop_list_input_obj1).parent();
        if (this.table_obj1 != null) {
            this.table_obj1.remove();
        }
        this.table_obj1 = $(table_str1);
        this.table_obj1.get(0).style.width = (parseInt($(this.drop_list_input_obj1).get(0).style.width, 10)) + "px";
        this.table_obj1.get(0).style.top = (parseInt($(this.drop_list_input_obj1).get(0).style.top, 10) + 30) + "px";
        this.table_obj1.get(0).style.left = (parseInt($(this.drop_list_input_obj1).get(0).style.left, 10)) + "px";
        this.table_obj1.get(0).style.position = 'absolute';
        parent_obj1.append(this.table_obj1);
    }
}




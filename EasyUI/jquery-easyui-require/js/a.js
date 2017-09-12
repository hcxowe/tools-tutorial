define(function() {
    $(function() {
        var unitName = undefined;  
        
        function newUser(){
            $('#dlg').dialog('open').dialog('setTitle','New User');
            $('#fm').form('clear');
        }
    
        var editIndex = undefined;
        function endEditing(index, row){
            if (editIndex == undefined){return true}
            if ($('#dg').datagrid('validateRow', editIndex)){
                $('#dg').datagrid('endEdit', editIndex);
                editIndex = undefined;
                return true;
            } else {
                return false;
            }
        }

        function onSpanClick() {
            alert('span was clicked');
        }

        $('#dg').datagrid({
            title: 'My Users',
            iconCls: 'icon-edit',
            url: './data.json',
            method: 'get',
            toolbar: [
                {
                    iconCls: 'icon-edit',
                    label: 'Edit',
                    handler: function(){alert('编辑按钮')}
                },
                {
                    iconCls: 'icon-help',
                    handler: function(){alert('帮助按钮')}
                }
            ],
            singleSelect: true,
            fitColumns: true,
            onClickRow: function(index) {
                $('#dg').datagrid('selectRow', index).datagrid('beginEdit', index);
                if (editIndex != index){
                    if (endEditing()){
                        $('#dg').datagrid('selectRow', index)
                                .datagrid('beginEdit', index);
                        editIndex = index;
                    } else {
                        $('#dg').datagrid('selectRow', editIndex);
                    }
                }
            },
            onEndEdit: function(index, row) {
                var ed = $(this).datagrid('getEditor', {
                    index: index,
                    field: 'lastname'
                });
    
                row.lastname = $(ed.target).combobox('getText');
    
                var ed = $('#dg').datagrid('getEditor', {index:editIndex,field:'phone'});
                var phone = $(ed.target).combotree('tree').tree('getSelected');
                if (phone) {
                    $("#dg").datagrid('getRows')[editIndex]['phone'] = phone.text;
                }
            },
            columns:[[
                {
                    field: 'lastname',
                    width: 100,
                    editor:{
                        type: 'combobox',
                        options: {
                            valueField: 'value',
                            textField: 'label',
                            data: [
                                {
                                    value: '123',
                                    label: 'oew'
                                },
                                {
                                    value: '321',
                                    label: 'owe'
                                }
                            ]
                        }
                    }
                },
                {
                    field: "phone",
                    width: "50",
                    editor: {
                        type: 'combotree',
                        options: {
                            valueField: 'id',
                            textField: 'text',
                            data: [
                                {
                                    id: 1,
                                    text: '123456'
                                },
                                {
                                    id: 2,
                                    text: '654321'
                                }
                            ]
                        }
                    }
                },
                {
                    field: "email",
                    width: "250",
                    formatter: function(value, row, index) {
                        return '<div style="position:relative;width:100%;height:100%;text-align:right;height:50px;"> \
                            <span onclick="onSpanClick();" style="position:absolute;top:0;left:0;background:#ccc;border-radius:50%;color:red;width:18px;height:18px;text-align:center;">' + index + '</span> \
                            <span onclick="onSpanClick();" style="position:absolute;bottom:0;left:0;background:blue;border-radius:50%;color:white;width:18px;height:18px;text-align:center;">' + index + '</span> \
                            ' + value +'\
                        </div>';
                    }
                },
                {
                    field: "age",
                    width: "50",
                    editor: {
                        type: 'numberbox', 
                        options: { 
                            precision:1
                        }
                    }
                }
            ]] 
        })
    });
});
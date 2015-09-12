jQuery(function(){
            jQuery('#dialog').dialog();
            jQuery('#dialog').dialog('close');
            var mxnb = '';
            jQuery('#content-html,#content-tmce').click(function(){             
            jQuery('.wp-switch-editor').removeClass('tactive');     
            if(this.id=='content-tmce') {jQuery('#ed_toolbar').hide(); jQuery('#content-tmce').addClass('tactive');   }
            if(this.id=='content-html') jQuery('#ed_toolbar').show();   
            jQuery('#post-status-info').show();     
            jQuery('#wp-content-editor-container').show();
            jQuery('#minimax-builder').hide();            
            jQuery('.export,.import,.clone').css('visibility','hidden');
            jQuery('#content-minimax').removeClass('tactive');
            jQuery.cookie('active_mx_'+pageid,'0');
            });
            
            jQuery(window).resize(function(){
            });
    
        jQuery('.module-preview.w3eden *').live('click',function(e){
            e.preventDefault();
        });

    jQuery(document).on('click', '#scng', function(){
        var data = jQuery('.mx-input').serializeArray();
        jQuery('#scng').html("<i class='fa fa-spinner fa-spin'></i> Saving...").attr('disabled','disabled');
        jQuery.post(ajaxurl+'?action=save_frontend_layout', data, function(res){
            jQuery('#scng').html("<i class='fa fa-save'></i> Save Changes").removeAttr('disabled');
        })
        return false;
    });
      
      jQuery(document).on('click', '.mwdth', function(){
              var prts = this.id.split("_");
              var grid = jQuery('#'+prts[1]+'_'+prts[2]).val();
              var tgrid = grid;
              var col = prts[2];
              var rowid = prts[1];
              var cols = jQuery(this).attr('cols');
              grid = parseInt(grid);
              col = parseInt(col);
              cols = parseInt(cols);
              if(cols>col) var nxtc = col+1;
              else if(cols==col&&cols!=1) var nxtc = col-1;
              var ngrid = parseInt(jQuery('#'+rowid+'_'+nxtc).val());
              if(this.rel=='inc') {
                  if(ngrid==1) return false;
                  jQuery('#'+rowid+'_'+col).val(grid+1);
                  jQuery('#column_'+col+'_'+rowid).attr('class','gridt minimax_column col-md-'+(grid+1));
                  jQuery('#'+rowid+'_'+nxtc).val(ngrid-1);
                  jQuery('#column_'+nxtc+'_'+rowid).attr('class','gridt minimax_column col-md-'+(ngrid-1));
                  
                  
              }   else   {
                  if(grid==1) return false;
                  jQuery('#'+rowid+'_'+col).val(grid-1);
                  jQuery('#column_'+col+'_'+rowid).attr('class','gridt minimax_column col-md-'+(grid-1));
                  jQuery('#'+rowid+'_'+nxtc).val(ngrid+1);
                  jQuery('#column_'+nxtc+'_'+rowid).attr('class','gridt minimax_column col-md-'+(ngrid+1));
                  
              }
              
              return false;
               
              
      });
      
      jQuery('.admin-cont').css('min-height',(jQuery('body').height()-120)+'px');
      
      jQuery('.insert-layout').live('click',function(){            
            if(holder=='') { 
                holder = jQuery(this).attr('holder')+" .layout-data";           
                holder_id = jQuery(this).attr('holder').replace("#layout_","");
            }       
            load_layout(this.rel);       
            return false;
       });
      
      jQuery('#theme-admin-menu a').click(function(){
          
          jQuery('.settings').hide();
          jQuery(jQuery(this).attr('href')).show();
          jQuery('#theme-admin-menu li a').removeClass('active');
          jQuery(this).addClass('active');
          var sn = jQuery(this).attr('href').replace('#','').replace('-',' ');
          jQuery('#admin-title span').html(sn).css('text-transform','capitalize');
          return false;
      });
      
      //Insert Layout
      jQuery('.select-layout').live('click',function(){
          holder = this.rel+" .layout-data";
          holder_id = this.rel.replace("#layout_","");
          jQuery('#ui-dialog-title-dialog').html('Select Layout');
          jQuery( "#dialog" ).dialog( "open" ).load("themes.php?page=minimax&task=select_layout&width=400&height=270");
          return false;
      });
      
      //Layout Settings
//      var layout_settings_id = "",layout_settings_data="";
//      jQuery('.rsettings').live('click',function(){
//          layout_settings_id = jQuery(this).attr('rel');          
//          layout_settings_data = jQuery('#'+layout_settings_id).val();
//          jQuery( "#dialog" ).dialog( 'option', 'title','Row Settings');
//          jQuery( "#dialog" ).dialog( 'option', 'width',660);
//          jQuery( "#dialog" ).dialog( "open" ).load(adminurl+"admin-ajax.php?page=minimax&action=layout_settings&layout_settings_id="+layout_settings_id+"&layout_settings_data="+layout_settings_data+"&modal=1&width=400&height=200");
//          return false;
//      });
      

      //Layout Settings
      var layout_settings_id = "",layout_settings_data="";
      jQuery('.rsettings').live('click',function(){
          layout_settings_id = jQuery(this).attr('rel');          
          layout_settings_data = jQuery('#'+layout_settings_id).val();
          
          jQuery( "#dialog" ).dialog( {modal: true} );
          jQuery( "#dialog" ).dialog( 'option', 'title','Row Settings');
          jQuery( "#dialog" ).dialog( 'option', 'width',660);
          var left = jQuery( window ).width()/2 - 330;
          var top = jQuery(document).scrollTop();
          jQuery(".ui-dialog").css({'left':left,'top':top});
          jQuery( "#dialog" ).html( '<img style="margin-left: 39%; margin-top: 100px; margin-bottom: 140px;" src='+base_theme_url+'/images/preloader.gif />');
          jQuery( "#dialog" ).dialog( "open" ).load(adminurl+"admin-ajax.php?page=minimax&action=layout_settings&layout_settings_id="+layout_settings_id+"&layout_settings_data="+layout_settings_data+"&modal=1&width=400&height=200");
          return false;
      });
      
      
      //Delete Layout
      jQuery('.rdel').live('click',function(){           
          jQuery(this).after("<div class='besure' style='display:none;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;left:28px;top:10px;width: 160px;z-index:99999999;position:absolute;color:#000 !important;border:5px solid rgba(0,0,0,0.4);'><div style='padding:10px;background:#fff;font-family:verdana;font-size:10px'>Are you sure? <a style='-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;background:#800;padding:4px 8px 6px 8px;color:#fff;text-decoration:none;' href='#' onclick='jQuery(\".besure\").fadeOut(function(){jQuery(this).remove();jQuery(\"#"+jQuery(this).attr("rel")+"\").slideUp(function(){jQuery(this).remove();});});return false;'>y</a> <a href='' style='-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;background:#080;padding:4px 8px 6px 8px;color:#fff;text-decoration:none;' onclick='jQuery(\".besure\").fadeOut(function(){jQuery(this).remove();mxdm=null;});return false;'>n</a></div></div>");
          jQuery('.besure').fadeIn();                     
      });
      
      
      
      //Select Module
//      var insertto = "", module_index = "", msf_mid = "", msf_title = "";
//      jQuery(document).on('click', '.btnAddMoudule',function(){
//          insertto = '#'+this.rel+' .module';          
//          module_index = this.rel;
//          jQuery( "#dialog" ).dialog( {modal: true} );
//          jQuery( "#dialog" ).dialog( "open" ).load(adminurl+"admin-ajax.php?page=minimax&action=insert_module&modal=1&width=770&height=600");
//          jQuery( "#dialog" ).dialog( 'option', 'width',940);
//          jQuery( "#dialog" ).dialog( 'option', 'title','Modules');
//          return false;
//      });
      
      
      //Select Module
      var insertto = "", module_index = "", msf_mid = "", msf_title = "";
      jQuery('.btnAddMoudule').live('click',function(){
          insertto = '#'+this.rel+' .module';          
          module_index = this.rel;
          
          var screen_width = jQuery( window ).width();
          
          jQuery( "#dialog" ).dialog( {modal: true} );
          jQuery( "#dialog" ).dialog( 'option', 'width',screen_width*0.7);
          jQuery( "#dialog" ).dialog( 'option', 'title','Modules');
          var left = jQuery( window ).width()/2 - (screen_width*0.7)/2;
          var top = jQuery(document).scrollTop();
          jQuery(".ui-dialog").css({'left':left,'top':top});
          
          jQuery( "#dialog" ).html( '<img style="margin-left: 42%; margin-top: 100px; margin-bottom: 140px;" src='+base_theme_url+'/images/preloader.gif />');
          
          jQuery( "#dialog" ).dialog( "open" ).load(adminurl+"admin-ajax.php?page=minimax&action=insert_module&modal=1&width=770&height=600");
          return false;
      });
      
      
      
      
      //Import Layout
      var insertto = "", module_index = "", msf_mid = "", msf_title = "";
      jQuery('.import-layout').live('click',function(){
          jQuery( "#dialog" ).dialog( 'option', 'title','Import Layout');
          jQuery( "#dialog" ).dialog( 'option', 'width',540);
          jQuery( "#dialog" ).dialog( "open" ).load(adminurl+"admin-ajax.php?page=minimax&action=import_layout&modal=1&width=370&height=300");
          return false;
      });
      
      //Insert Module
//      jQuery('.insert').live('click',function(){
//          
//          msf_mid = jQuery(this).attr('rel');
//          msf_title = jQuery(this).attr('wname');
//          var data = jQuery(this).attr('data')==undefined?"":"&instance="+jQuery(this).attr('data');
//          var datafield = jQuery(this).attr('datafield')==undefined?"":"&datafield="+jQuery(this).attr('datafield');          
//          var post = "&post="+pageid;
//          var data_inst = jQuery('#'+jQuery(this).attr('datafield')).val();
//                             
//          jQuery( "#dialog" ).dialog( 'option', 'title', msf_title);
//          jQuery( "#dialog" ).html( 'Loading...');
//          jQuery( "#dialog" ).dialog( 'option', 'width',700);
//          jQuery( "#dialog" ).dialog( 'option', 'modal',true);
//          jQuery( "#dialog" ).dialog('open').load(adminurl+"admin-ajax.php?page=minimax&action=module_settings&modal=1&width=510&height=500&module="+msf_mid+data+datafield+post,{data_inst:data_inst});
//
//          return false;
//      });
      
      
            //Insert Module
      jQuery('.insert').live('click',function(){
          
          msf_mid = jQuery(this).attr('rel');          
          msf_title = jQuery(this).attr('wname');
          var data = jQuery(this).attr('data') == undefined ? "" : "&instance="+jQuery(this).attr('data');
          var datafield = jQuery(this).attr('datafield')==undefined?"":"&datafield="+jQuery(this).attr('datafield');
          var post = "&post="+pageid;
          var data_inst = jQuery('#'+jQuery(this).attr('datafield')).val();
                              
          jQuery( "#dialog" ).dialog( {modal: true} );                    
          jQuery( "#dialog" ).dialog( 'option', 'title', msf_title);
          var left = jQuery( window ).width()/2 - 330;
          var top = jQuery(document).scrollTop();
          jQuery(".ui-dialog").css({'left':left,'top':top});
          
          jQuery( "#dialog" ).html( '<img style="margin-left: 39%; margin-top: 100px; margin-bottom: 140px;" src='+base_theme_url+'/images/preloader.gif />');
          jQuery( "#dialog" ).dialog( 'option', 'width',700);
          jQuery( "#dialog" ).dialog( 'option', 'dialogClass','mce');
          jQuery( "#dialog" ).dialog('open').load(adminurl+"admin-ajax.php?page=minimax&action=module_settings&modal=1&width=510&height=500&module="+msf_mid+data+datafield+post,{data_inst:data_inst});

          return false;
      });
      
      
      //Delete Module              
      jQuery('.delete_module').live('click',function(){            
          jQuery(this).after("<div class='besure' style='display:none;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;z-index:99999999;position:absolute;right:0px;top:30px;color:#000;border:5px solid rgba(0,0,0,0.4);'><div style='padding:10px;background:#fff;color: #000000 !important;font-family: verdana;font-size:10px'>Are you sure? <a style='-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;background:#800;padding:4px 8px 6px 8px;color:#fff;text-decoration:none;' href='#' onclick='jQuery(\".besure\").fadeOut(function(){jQuery(this).remove();jQuery(\""+jQuery(this).attr("rel")+"\").slideUp(function(){jQuery(this).remove();});});return false;'>y</a> <a href='' style='-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;background:#080;padding:4px 8px 6px 8px;color:#fff;text-decoration:none;' onclick='jQuery(\".besure\").fadeOut(function(){jQuery(this).remove();mxdm=null;});return false;'>n</a></div></div>");
          jQuery('.besure').fadeIn();
          
      });
      
      
      //Clone a module
     jQuery('.module-clone').live('click', function() {

        var d = new Date();
        var new_id = d.getTime();
        var col_id = jQuery(this).attr('col_id');
        var rel = jQuery('#'+col_id).attr('rel');
        var new_col_id = 'module_'+rel+'_'+new_id;
        
        var cloned_row = jQuery("#" + col_id).clone().attr('id', new_col_id);
        var re = new RegExp(col_id,"g");
        
        cloned_row.html(function(i, oldHTML) {
            return oldHTML.replace(re, new_col_id);
        });

        jQuery("#"+col_id).after(cloned_row);

        });
      
     //Clone a row
     jQuery('.rclone').live('click', function() {

        var d = new Date();
        var new_id = d.getTime();
        var row_id = jQuery(this).attr('rel');
        var gid = jQuery(this).attr('rthis');
        var cloned_row = jQuery("#" + row_id).clone().attr('id', 'row_li_'+new_id);
        var re = new RegExp(gid,"g");
        
        cloned_row.html(function(i, oldHTML) {
            return oldHTML.replace(re, new_id);
        });

        jQuery("#"+row_id).after(cloned_row);

        });
      
      
      // Form Submit
      jQuery('#minimax-form').submit(function(){
          jQuery('#mxinfo').html('Please Wait...')
          jQuery('#mxinfo').slideDown();
          jQuery(this).ajaxSubmit({              
              url:ajaxurl,
              success:function(res){
                   jQuery('#mxinfo').html('Setting Saved Successfully!')
                   setTimeout("jQuery('#mxinfo').slideUp();",2000);
              }   
          });
          
          return false;
          
      });            
      
      jQuery('#module-settings-form').live('submit',function(){
          jQuery(this).append('<i class="fa fa-spinner"></i> Saving...');
          jQuery(this).ajaxSubmit({              
              url:ajaxurl+'?page=minimax&action=module_settings_data',
              success:function(res){
                  var d = new Date();
                  var z = d.getTime();
                  jQuery(insertto).append('<li id="module_'+module_index+'_'+z+'" rel="'+module_index+'" class="minimax_module '+msf_mid+'"><input class="mx-input" type="hidden" id="modid_module_'+module_index+'_'+z+'" name="modules['+module_index+'][]" value="'+msf_mid+'" /><input class="mx-input" type="hidden" name="modules_settings['+module_index+'][]" id="modset_module_'+module_index+'_'+z+'" value="'+res+'" /><div class="mod-ctrl">'+msf_title+'<nobr class="ctl"><i class="handle icon icon-move"></i><i class="delete_module icon icon-trash" rel="#module_'+module_index+'_'+z+'"></i><i class="insert icon icon-cog" rel="'+msf_mid+'" datafield="modset_module_'+module_index+'_'+z+'" data="'+module_index+'|0"></i></nobr></div><div class="module-p"><i class="icon-spinner icon-spin"></i> Loading Preview...</div><div class="clear"></div></li>');
                  jQuery( insertto ).sortable({handle : '.handle', connectWith: "ul.module"});
                  jQuery( insertto ).disableSelection({handle : '.handle'});   
                  jQuery("#dialog").html("Loading...");                
                  jQuery('#dialog').dialog('close');
                  jQuery('#module_'+module_index+'_'+z+' .module-p').load(ajaxurl+'?page=minimax&action=get_module_preview&front=1',{mod:msf_mid, modinfo:res});
                 
              }   
          });
          
          return false;
      });
      
      jQuery('#layout-settings-form').live('submit',function(){
          var layout_settings_id = jQuery(this).attr('rel');
          jQuery(this).append('<div style="position: absolute;margin-top: -5px"><i class="fa fa-spinner"></i> Saving...</div>');
          jQuery(this).ajaxSubmit({                        
              url:ajaxurl+'?page=minimax&action=layout_settings_data',
              success:function(res){
                  jQuery('#'+layout_settings_id).val(res);
                  jQuery("#dialog").dialog("close");
              }   
          });
          
          return false;
      });
      
      jQuery('#update-module-settings-form').live('submit',function(){
          var datafield = jQuery(this).attr('datafield');
          jQuery(this).append('<i class="fa fa-spinner"></i> Saving...');
          jQuery(this).ajaxSubmit({              
              url:ajaxurl+'?page=minimax&action=module_settings_data',
              success:function(res){
                  //alert('#'+datafield);
                  jQuery('#'+datafield).val(res);
                  //jQuery('#'+datafield+"_icon").attr('data',res);
                  jQuery("#dialog").html("Loading...");
                  jQuery('#dialog').dialog('close');
                  var mod = datafield.replace("modset_","");
                  var msf_mid =   datafield.replace("modset_","modid_");
                  msf_mid = jQuery('#'+msf_mid).val();
                  jQuery('#'+mod+' .minimax_module').prepend('<span style="position: absolute;background: #E83B06;color: #ffffff;padding: 6px 10px;z-index: 999999;border-radius: 2px !important;font-size:11px;font-weight:900;letter-spacing: 1px"><i class="icon-spin icon-spinner"></i> Updating View...</span>')
                  jQuery('#'+mod+' .minimax_module').load(ajaxurl+'?page=minimax&action=get_module_preview&front=1',{mod:msf_mid, modinfo:res});
              }   
          });
          
          return false;
      });
      
      /* sort event handler to control sortable element offset issue in FF [Shahriar][v.3.1.3]*/
      jQuery('.module').sortable({handle : '.handle',
                                    sort : function(event, ui) {
                                                var $target = jQuery(event.target);
                                                if (!/html|body/i.test($target.offsetParent()[0].tagName)) {
                                                var top = event.pageY - $target.offsetParent().offset().top - (ui.helper.outerHeight(true) / 2);
                                                ui.helper.css({'top' : top + 'px'});
                                                }
                                            },
                                connectWith: "ul.module"
                            });
      
      jQuery( '.layout-data' ).sortable({handle : '.row-handler'});
      jQuery( '.layout-data' ).disableSelection();      

      jQuery('.module').bind('sortupdate',function(event, ui){
          var d = new Date();
          var z = d.getTime();
          var id = jQuery(jQuery(ui.item).parent()).attr('rel')+'_'+z;
          var rplc = jQuery(ui.item).attr('rel');
          var rplcw = jQuery(jQuery(ui.item).parent()).attr('rel');
          jQuery(ui.item).attr('id',id).attr('rel',jQuery(jQuery(ui.item).parent()).attr('rel'));          
          jQuery(ui.item).html(jQuery(ui.item).html().replace(new RegExp(rplc,"g"),rplcw));
          jQuery(ui.item).html(jQuery(ui.item).html().replace(new RegExp(rplc+'_([\d]*)',"g"),rplcw+'_'+z));
           
      });
  });
  
  var holder = "", holder_id = "";
  function load_layout(layout){           
     jQuery.get(adminurl+"admin-ajax.php?page=minimax&action=insert_layout_front&holder="+holder_id+"&layout="+layout,function(res){
         jQuery(holder).append(res);         
         jQuery( '.layout-data' ).sortable({handle : '.row-handler'});
         jQuery( '.layout-data' ).disableSelection();
         jQuery("#dialog").html("Loading...");
         jQuery('#dialog').dialog('close');
         jQuery('.borderfocus ul.module').animate({ borderColor: "#ffffff" }, 'slow');
         setTimeout("jQuery('.minimax_content_area').removeClass('borderfocus');", 3000);
     });        
  }
  
  function mediaupload(id){
      var id = '#'+id;
      tb_show('Upload Image','media-upload.php?TB_iframe=1&width=640&height=624');
      window.send_to_editor = function(html) {           
              var imgurl = jQuery('img',"<p>"+html+"</p>").attr('src');                                    
              jQuery(id).val(imgurl);
              tb_remove();
              }
      
  }
  
  function switchtominimax(){          
            jQuery('.wp-switch-editor').removeClass('tactive'); 
            jQuery('#wp-content-wrap').removeClass('tmce-active').removeClass('html-active');
            jQuery('#wp-content-editor-container').hide();
            jQuery('#post-status-info').hide();
            jQuery('#minimax-builder').show();
            jQuery('.export,.import,.clone').css('visibility','visible');
            jQuery('.minimax-toolbar').show();
            jQuery('#content-minimax').addClass('tactive');
            reset_layout_width();
            jQuery.cookie('active_mx_'+pageid,'1');            
        }
        
  function reset_layout_width(){
            var mw = jQuery('.layout-data li').width()-35;
            if(mw>0);                
            jQuery('.row-container').css('width',mw+'px');
        }
        
 //function for the module activate/deactivate
 jQuery('.mod_name').live("click",function(){

     var obj=this;
     jQuery(this).html('<i class="icon-spinner icon-spin"></i>');
     jQuery('.mod_'+jQuery(obj).attr("rel")).removeClass(jQuery('.mod_'+jQuery(obj).attr("rel")).attr("rel")); 
     jQuery('.mod_'+jQuery(obj).attr("rel")).addClass( "loading");    
     jQuery.post(ajaxurl,{
        action:"module_status_change" ,
        status:jQuery(this).attr("status"),
        module: jQuery(this).attr("rel")
     },function(res){         
          
         jQuery('.mod_'+jQuery(obj).attr("rel")).removeClass(jQuery('.mod_'+jQuery(obj).attr("rel")).attr("rel"));           
         jQuery('.mod_'+jQuery(obj).attr("rel")).addClass( res); 
         jQuery('.mod_'+jQuery(obj).attr("rel")).attr("rel",res);

         if(res=="power_on"){
             jQuery(obj).html('Deactivate');
             jQuery(obj).attr('status','power_on');
             jQuery('#st_'+jQuery(obj).attr("rel")).removeClass("mod_status_Inactive").removeClass("label-danger");
             jQuery('#st_'+jQuery(obj).attr("rel")).addClass("mod_status_Active").addClass('label-success');
             jQuery('#st_'+jQuery(obj).attr("rel")).html("active");
         }else{
             jQuery(obj).attr('status','power_off');
             jQuery(obj).html('Activate');
             jQuery('#st_'+jQuery(obj).attr("rel")).removeClass("mod_status_Active").removeClass("label-success");
             jQuery('#st_'+jQuery(obj).attr("rel")).addClass("mod_status_Inactive").addClass('label-danger');
             jQuery('#st_'+jQuery(obj).attr("rel")).html("inactive");
         }
     });


});

/*Fixes link field focus issue in tinyMCE link dialog (Added V.3.0.8)*/
jQuery(document).on('focusin', function(e) {
    if (jQuery(e.target).closest("#wp-link-wrap").length) {
        e.stopImmediatePropagation();
    }
    if (jQuery(e.target).closest("#embed-url-field").length) {
        e.stopImmediatePropagation();
    }
    if (jQuery(e.target).closest(".alignment").length) {
        e.stopImmediatePropagation();
    }
    if (jQuery(e.target).closest(".attachment-details").length) {
        e.stopImmediatePropagation();
    }
    if (jQuery(e.target).closest(".attachment-display-settings").length) {
        e.stopImmediatePropagation();
    }
    if (jQuery(e.target).closest(".media-toolbar").length) {
        e.stopImmediatePropagation();
    }    
});

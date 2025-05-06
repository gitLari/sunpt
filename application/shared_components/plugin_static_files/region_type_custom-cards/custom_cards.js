function init_custom_card( pRegionId, pOptions ){

  // default options
  pOptions = $.extend({
    numberMin: 1
    ,numberMax: 35
    ,numberMinKg: -100
    ,numberMaxKg: 400
  }, pOptions );


  // set button actions
  $( "#" + pRegionId ).find( "button" ).each(function(){

    var this$   = $(this)
      , btnType = this$ .data("btn-action")
    ;
  
    if( btnType === "SAVE" ){
      
      this$.click( function(){
       
        var this$           = $( this )
          , rowId           = this$.data( "row-id" )
          , lSeqId          = this$.data( "seq-id" )
          , lNum1$          = $( "#" + pRegionId + "_num1_" + rowId )
          , lNum2$          = $( "#" + pRegionId + "_num2_" + rowId )
          , lVal1           = lNum1$.val()
          , lVal2           = lNum2$.val()
          , lAjaxIdentifier = this$.data( "ajax-identifier" )
        ;

        apex.server.plugin ( lAjaxIdentifier, {
          x01: lSeqId
          ,x02: lVal1
          ,x03: lVal2
        }, {
          success: function( data ) {
            // do something here

            if( data.status === "ok" ){

              this$.parents( ".x-region-container" ).addClass( "u-color-29" );

              $.merge( lNum1$, lNum2$ ).prop( "disabled", true );
              //lNum2$.prop( "disabled", true );

              this$.addClass( "u-success" ).siblings( "button" ).prop( "disabled", true );

              apex.message.showPageSuccess( "Suoritettu" );

              setTimeout( apex.message.hidePageSuccess, 1000 );
              $.merge( lNum1$, lNum2$ ).prop("disabled", false);
            } else {

              apex.message.showErrors([
                {
                  type:       "error"
                  ,location:  "page"
                  ,message:   "Something went wrong!"
                  ,unsafe:     false
                }
              ]);

            }         

          }
        });

      });

    } else {
    
      this$.click( function(){
   
        var this$   = $( this )
          , rowId   = this$.data( "row-id" )
        //  , input$  = $( "#" + pRegionId + "_num2_" + rowId )
        //  , lNum    = input$.val()
             , input1$  = $( "#" + pRegionId + "_num1_" + rowId )
        , lNum1    = input1$.val()
        , input2$  = $( "#" + pRegionId + "_num2_" + rowId )
        , lNum2    = input2$.val()
        , input3$  = $( "#" + pRegionId + "_num3_" + rowId )
        , lLiikeId = input3$.val()
        ;
        
        if( isNaN( lNum1 ) ){
          return false;
        }
        if( isNaN( lNum2 ) ){
          return false;
        }

        lNum1 = parseFloat( lNum1 );
        lNum2 = parseFloat( lNum2 );

        switch ( this$.data( "btn-action" ) ) {
          case 'PLUS1':
            lNum1 = lNum1 + 1;
            break;
          case 'PLUS1MAX':
            lNum1 = lNum1 + 2.5;
            break;
          case 'MINUS1':
            lNum1 = lNum1 - 1;
            break;
          case 'MINUS1MAX':
            lNum1 = lNum1 - 2.5;
            break;
          case 'PLUS2':
            lNum2 = lNum2 + 1;
            break;
          case 'MINUS2':
            lNum2 = lNum2 - 1;
            break;
          case 'KATSO':
            $s('P45_LIIKE_ID',lLiikeId); //$v('F05')
            $('#liike').dialog('open');  
        }

        if( lNum2 >= pOptions.numberMin && lNum2 <= pOptions.numberMax ){
          input2$.val( lNum2 );
        }
        if( lNum1 >= pOptions.numberMinKg && lNum1 <= pOptions.numberMaxKg ){
          input1$.val( lNum1 );
        }

      });
    
    }
  });

  // event listener to input elements
  $( "#" + pRegionId ).find( "input[type=number]" ).keyup( function(){
    
    var lNum = $( this ).val();

    if( isNaN( lNum ) ){
      return false;
    }

    lNum = parseFloat( lNum );
  
    if( !( lNum >= pOptions.numberMin && lNum <= pOptions.numberMax ) ){
      return false;
    }

  });

}

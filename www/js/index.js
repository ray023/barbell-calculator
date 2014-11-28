var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var barbellGrid = parentElement.querySelector('#_barbellGrid');

        var plate_class_array  =   new Array('0.25','2.5','5','10','15','25','35','45');
        var barbell_calculator =   '<div class="ui-grid-b" >';
    
        var ASCII_A    =   97;
        var ASCII_C    =   99;
        var current_block  =   ASCII_A;
        for (var i = 0; i < plate_class_array.length; i++)
        {

            barbell_calculator  =   barbell_calculator  +    '<div class="ui-block-' + String.fromCharCode(current_block) + '">';
            barbell_calculator  =   barbell_calculator  +    '<a href="#" class="plate-button" data-role="button" data-corners="false">' + plate_class_array[i] + ' #</a>';
            barbell_calculator  =   barbell_calculator  +    '</div>';
            current_block  =   current_block  == ASCII_C ? ASCII_A : current_block + 1;
        }
        barbell_calculator  =   barbell_calculator  +  '</div><!-- /grid-b -->';
        barbell_calculator  =   barbell_calculator  + '<a href="#" id="undo" data-role="button" data-mini="true" data-corners="false">Undo</a>';
        barbell_calculator  =   barbell_calculator  + '<div id="plates_on_bar"></div>';

        $('#_barbellGrid').html(barbell_calculator).trigger('create');


            try {
                sessionStorage['bc_test'] = 1;
                localStorage.removeItem('bc_test');
            } 
            catch(e) {
                alert('ERROR!\r\nSession Storage disabled.' );
            }
            
            $('#_resetWeight').click(function(){
                sessionStorage.removeItem('plates');
                recalculate_weight();
            });

            $('#_setNewMax').click(function(){
                //Calling it potential_max b/c not sure if user is ready to 
                //save till they select exercise
                sessionStorage.potential_max    =   $('#_calculatedWeight').html();
                $.mobile.changePage("#RecordNewMax");
            });
            
            $('#_barbellBase').change(function() {
                recalculate_weight();
            });
            $('#undo').click(function() {

                if (typeof sessionStorage['plates'] === 'undefined')
                    return;
                var storedPlates=[];
                storedPlates=JSON.parse(sessionStorage['plates']);
                storedPlates.pop();
                sessionStorage['plates']=JSON.stringify(storedPlates);
                recalculate_weight();
            });

            $('.plate-button').click(function() {
                var storedPlates=[];
                if (typeof sessionStorage['plates'] != 'undefined') {
                    storedPlates=JSON.parse(sessionStorage['plates']);
                }
                
                var oPlateToAdd = $(this).text().replace(' #','');
                var newIndex    =   storedPlates.length;
                storedPlates[newIndex]=oPlateToAdd;
                sessionStorage['plates']=JSON.stringify(storedPlates);
                recalculate_weight();
            });
                        
            recalculate_weight();
    }
};

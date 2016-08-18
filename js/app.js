(function($) {
	var app = {};
	app.init = function() {
		app.names = {
			menu: 'openmenu',
			open: 'open',
			setvalue: 'setvalue',
			from: 'from',
			to: 'to',
			label: 'label',
			input: 'input'
		};
		app.openmenu();
	}
	app.openmenu = function() {
		var isOpen = false;
		var menu = $('[data-action="'+app.names.menu+'"]');
		menu.on('click',function(){
			if(!isOpen){
				$(this).addClass(app.names.open);
				$('[data-event="'+app.names.menu+'"]')
					.addClass(app.names.open)
					.find('[data-id="'+app.names.from+'"]')
					.show()
					.end()
					.find('[data-id="'+app.names.to+'"]')
					.hide()
					.end();
				isOpen = true;
			} else {
				$(this).removeClass(app.names.open);
				$('[data-event="'+app.names.menu+'"]').removeClass(app.names.open);
				isOpen = false;
			}
		});
		$('[data-action="'+app.names.setvalue+'"]').each(function(){
				var ul = $(this);
				$(this).on('click','li', function(){
					var input = $(this).closest('ul').siblings('input[type="text"]');
					var value = $(this).attr('data-value');
					input.val(value).trigger('change');
					ul.hide();
					if( ul.attr('data-id') == 'from' ){
						$('[data-id="'+app.names.to+'"]').children().each(function(){
							if($(this).attr("data-value") < value+1){
								$(this).hide();
							}
						});
						$('[data-id="'+app.names.to+'"]').show();
					} else {
						ul.children().show();
						menu.trigger('click');
					}
					
				});
		});

		var inputs = $('[data-id="'+app.names.input+'"]');
		var label = $('[data-id="'+app.names.label+'"]')
		inputs.each(function(){
			$(this).on('change', function(){
				var value = $(this).val();
				var text = '';
				var placeholder = label.attr('data-placeholder');
				var ul = $(this).siblings('[data-action="'+app.names.setvalue+'"]');
				if(value != ''){
					if( $(this).attr('id') == app.names.from ){
						var valueTo = inputs.filter('#'+app.names.to).val();
						text = value + ((valueTo != '') ? ' — '+valueTo : '');	
					} else {
						var valueFrom = inputs.filter('#'+app.names.from).val();
						text = ((valueFrom != '') ? valueFrom+' — ' : '') + value;
					}
				} else {
					if( $(this).attr('id') == app.names.from ){
						var valueTo = inputs.filter('#'+app.names.to).val();
						text = (valueTo != '') ? ' до '+valueTo : placeholder;
						ul.show();
						$('[data-id="'+app.names.to+'"]').hide();
					} else {
						var valueFrom = inputs.filter('#'+app.names.from).val();
						if(valueFrom != '') {
							text = ' от '+valueFrom;
							ul.show();
						} else {
							text = placeholder;
							if(ul.is(':visible')) ul.hide();
						}
					}	
				}
				label.text(text);
			});
		});

	}


	window.app = app;
})(jQuery)

$(document).ready(function() {
	app.init();
});
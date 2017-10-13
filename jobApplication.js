var app =
{
	DEFAULT_PAGE: 1,
	init: function()
	{
		// Element references
		app.form = $('#form');
		app.sectionTitle = $('#sectionTitle');
		app.fieldset = $('#fieldset');

		app.nextButton = $('#formNext');
		app.nextButton.on("click", app.onNextButton);

		app.navigation = $('#navigation');

		// Fields and navigation
		for(let i = 0; i < fields.length; i++)
		{
			app.fieldset.append(app.getFormTemplate(fields[i].fields));
			app.navigation.append(app.getNavigationTemplate(i + 1, fields[i].title));
		}

		$('> div', app.navigation).on("click", app.onNavigationClick);

		// Set first page
		app.setPage(app.DEFAULT_PAGE);
	},
	onNextButton: function(event)
	{
		if(app.currentPage >= fields.length)
			app.form.submit();
		else
			app.setPage(app.currentPage + 1);
	},
	onNavigationClick: function()
	{
		app.setPage($(this).index() + 1);
	},
	setPage: function(page)
	{
		app.currentPage = page;

		app.sectionTitle.text(fields[page - 1].title);

		$('> div', app.fieldset).hide();
		$('> div:nth-child(' + page + ')', app.fieldset).show();

		$('.current').removeClass("current");
		$('> div:nth-child(' + page + ')', app.navigation).addClass("current");

		if(page >= fields.length)
			app.nextButton.text("Send Application");
		else
			app.nextButton.text("Next");
	},
	getFormTemplate: function(cols)
	{
		let template = "<div>";

		for(let i = 0; i < cols.length; i++)
		{
			template +=
			'<div class="cols">' +
				app.getColTemplate(cols[i]) +
			'</div>';
		}

		return template + "</div>";
	},
	getColTemplate: function(fields)
	{
		let template = "";

		for(let i = 0; i < fields.length; i++)
		{
			template +=
			`<div class="field">
				<label for="` + fields[i].name + `">` + fields[i].label + `</label>
				` + app.getFieldTemplate(fields[i]) + `
			</div>`;
		}

		return template;
	},
	getFieldTemplate: function(field)
	{
		if(field.type == "textarea")
		{
			return '<textarea id="' + field.name + '" name="' + field.name + '"></textarea>';
		}
		else if(field.type == "radio" || field.type == "checkbox")
		{
			let template = "";

			for(let i = 0; i < field.options.length; i++)
				template += app.getRadioTemplate(field, field.options[i], i);

			return template;
		}
		else if(field.type == "select")
		{
			let template = "<select>";

			for(let i = 0; i < field.options.length; i++)
				template += "<option>" + field.options[i] + "</option>";

			return template + "</select>";
		}
		else
		{
			return '<input type="' + field.type + '" id="' + field.name + '" name="' + field.name + '" />';
		}
	},
	getRadioTemplate: function(field, option, optionID)
	{
		let id = field.name + "-" + optionID;

		return `<div class="radioContainer">
			<input type="` + field.type + `" id="` + id + `" name="` + field.name + `">
			<label for='` + id + `'>` + option + `</label>
		</div>`;
	},
	getNavigationTemplate: function(number, text)
	{
		return `<div>
			<div class="num">` + number + `</div>
			<h3>` + text + `</h3>
		</div>`;
	}
};

$(app.init);

var fields =
[
	{
		title: "Personal Information",
		fields:
		[
			[{label: "Email", type: "text", name: "email"}],
			[
				{label: "Prefix", type: "select", name: "prefix", options: ["Mr", "Ms", "Mrs", "Dr"]},
				{label: "First Name", type: "text", name: "firstName"},
				{label: "Last Name", type: "text", name: "lastName"}
			],
			[{label: "Phone Number", type: "text", name: "phoneNumber"}, {label: "Social Security Number", type: "password", name: "socialSecurity"}],
			[{label: "Gender", type: "radio", name: "gender", options: ["Male", "Female", "Tyrannosaurus Rex", "Other"]}],
		]
	},
	
	{
		title: "Commitment",
		fields:
		[
			[{label: "Type of Position (check all that apply)", type: "checkbox", name: "positionType", options: ["Part time", "Full time", "Contractor"]}],
			[
				{label: "Start Time (Monday-Friday)", type: "time", name: "startTime"},
				{label: "End Time", type: "time", name: "endTime"}
			],
			[{label: "When can you start working?", type: "date", "name": "startDate"}]
		]
	},

	{
		title: "Personal Statement",
		fields:
		[
			[{label: "What previous experience do you have in emergency response?", type: "textarea", name: "previousExperience"}],
			[{label: "Why should we pick you over any other candidate?", type: "textarea", name: "whyMe"}],
			[{label: "Cover Letter (optional)", type: "file", name: "coverLetter"}],
		]
	}
];
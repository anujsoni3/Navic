export const json = {
    "description": "description",
    "logo": "https://api.surveyjs.io/private/Surveys/files?name=223a3e72-bf86-4801-bda5-94f4002ac662",
    "logoWidth": "auto",
    "logoHeight": "64",
    "completedHtml": "<div style=\"max-width:564px;text-align:center;margin:16px auto;\">\n\n<div style=\"padding:0 24px;\">\n<h4>Rental Form Successfully Saved.</h4>\n<br>\n<p>You've successfully completed the car rental form. The vehicle is now ready for pick up by the lessee.</p>\n</div>\n</div>",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "multipletext",
        "name": "pick-up-date",
        "width": "60%",
        "minWidth": "256px",
        "validators": [
         {
          "type": "expression",
          "text": "Pick-up date cannot precede today's date.",
          "expression": "{pick-up-date.date} >= today()"
         }
        ],
        "items": [
         {
          "name": "date",
          "inputType": "date",
          "title": "Pick-up Date"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "pick-up-time",
        "width": "40%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "choices": [
         "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
         "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
         "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
         "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM",
         "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM",
         "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM"
        ],
        "placeholder": "Pick-up Time",
        "allowClear": false
       },
       {
        "type": "multipletext",
        "name": "drop-off-date",
        "width": "60%",
        "minWidth": "256px",
        "validators": [
         {
          "type": "expression",
          "text": "Your car drop-off date must be after the pick-up date.",
          "expression": "{drop-off-date.date} > {pick-up-date.date}"
         }
        ],
        "items": [
         {
          "name": "date",
          "inputType": "date",
          "title": "Drop-off Date"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "drop-off-time",
        "width": "40%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "choicesFromQuestion": "pick-up-time",
        "placeholder": "Drop-off Time",
        "allowClear": false
       }
      ],
      "questionTitleLocation": "hidden",
      "title": "Rental Period"
     },
     {
      "name": "page2",
      "elements": [
       {
        "type": "dropdown",
        "name": "vehicle-model",
        "width": "40%",
        "minWidth": "256px",
        "choices": [
  "Honda CR-V EX-L",
  "Chevrolet Sonic LT",
  "Toyota Highlander Limited",
  "Toyota Sequoia Platinum",
  "Mercedes-Benz C-Class C 250",
  "Volkswagen Passat 2.0T SE",
  "Toyota Corolla SE",
  "Ford Explorer XLT",
  "BMW 335 i xDrive",
  "Jeep Patriot Sport",
"Jeep Wrangler Unlimited Sport",
"Mahindra ScorpiN",
"Maruti Suzuki Swift",
  "Hyundai i20",
  "Honda City",
  "Toyota Innova Crysta",
  "Hyundai Creta",
  "Tata Harrier",
  "Mahindra XUV700",
  "Toyota Fortuner",
  "Skoda Slavia",
  "Kia Seltos"
]
,
        "choicesOrder": "random",
        "placeholder": "Make and Model",
        "allowClear": false
       },
       {
        "type": "dropdown",
        "name": "vehicle-year",
        "width": "20%",
        "minWidth": "112px",
        "startWithNewLine": false,
        "placeholder": "Year",
        "allowClear": false,
        "choicesMin": 2004,
        "choicesMax": 2025
       },
       {
        "type": "dropdown",
        "name": "vehicle-color",
        "width": "40%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "choices": [ "White", "Black", "Gray", "Red", "Silver" ],
        "choicesOrder": "random",
        "placeholder": "Color",
        "allowClear": false
       },
       {
        "type": "text",
        "name": "vehicle-vin",
        "width": "40%",
        "minWidth": "256px",
        "maxLength": 17,
        "placeholder": "VIN"
       },
       {
        "type": "text",
        "name": "vehicle-mileage",
        "width": "20%",
        "minWidth": "112px",
        "startWithNewLine": false,
        "title": "Details",
        "placeholder": "Mileage"
       },
       {
        "type": "rating",
        "name": "vehicle-gas-tank",
        "width": "100%",
        "minWidth": "256px",
        "title": "Gasoline Status",
        "autoGenerate": false,
        "rateValues": [
         {
          "value": 1,
          "text": "Empty Tank"
         },
         {
          "value": 2,
          "text": "1/4"
         },
         {
          "value": 3,
          "text": "1/2"
         },
         {
          "value": 4,
          "text": "3/4"
         },
         {
          "value": 5,
          "text": "Full Tank"
         }
        ],
        "displayMode": "buttons"
       },
       {
        "type": "signaturepad",
        "name": "damage-illustration",
        "signatureWidth": 824,
        "signatureHeight": 684,
        "signatureAutoScaleEnabled":  true,
        "backgroundImage": "https://api.surveyjs.io/private/Surveys/files?name=9c38f0ea-5f03-4120-9708-17e55f49aa19",
        "penColor": "#dd277f",
        "showPlaceholder": false
       },
       {
        "type": "comment",
        "name": "damage-information",
        "width": "100%",
        "minWidth": "256px",
        "rows": 6,
        "placeholder": "Please give more information about the damage you've marked above — if any.",
        "autoGrow": true,
        "allowResize": false
       }
      ],
      "questionTitleLocation": "hidden",
      "title": "Vehicle Information"
     },
     {
      "name": "page3",
      "elements": [
       {
        "type": "text",
        "name": "lessee-full-name",
        "width": "60%",
        "minWidth": "256px",
        "placeholder": "Full Name"
       },
       {
        "type": "text",
        "name": "lessee-passport-number",
        "width": "40%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "title": "Passport #",
        "placeholder": "Passport #"
       },
       {
        "type": "comment",
        "name": "lessee-address",
        "width": "100%",
        "minWidth": "256px",
        "rows": 3,
        "placeholder": "Address",
        "autoGrow": true,
        "allowResize": false
       },
       {
        "type": "text",
        "name": "lessee-city",
        "width": "40%",
        "minWidth": "256px",
        "placeholder": "City"
       },
       {
        "type": "text",
        "name": "lessee-state",
        "width": "20%",
        "minWidth": "112px",
        "startWithNewLine": false,
        "placeholder": "State"
       },
       {
        "type": "text",
        "name": "lessee-zip",
        "width": "40%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "placeholder": "Zip Code"
       },
       {
        "type": "text",
        "name": "lessee-driver-license-number",
        "width": "100%",
        "minWidth": "256px",
        "placeholder": "Driver's License #"
       },
       {
        "type": "multipletext",
        "name": "lessee-driving-license-exp-date",
        "width": "60%",
        "minWidth": "256px",
        "items": [
         {
          "name": "date",
          "inputType": "date",
          "title": "Expiration Date"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "lessee-driving-license-issue-country",
        "width": "40%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "choicesByUrl": {
         "url": "https://surveyjs.io/api/CountriesExample"
        },
        "placeholder": "Issuing Country",
        "allowClear": false
       },
       {
        "type": "file",
        "name": "lessee-driving-license-photo",
        "width": "100%",
        "minWidth": "256px",
        "filePlaceholder": "Please upload a copy of a driver's license."
       }
      ],
      "questionTitleLocation": "hidden",
      "title": "Lessee Details"
     }
    ],
    "showQuestionNumbers": "off",
    "questionErrorLocation": "bottom",
    "completeText": "Confirm",
    "questionsOnPageMode": "singlePage",
    "widthMode": "static",
    "width": "904",
    "fitToContainer": true
   };
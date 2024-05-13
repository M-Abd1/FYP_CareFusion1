
    function formValidations() {
        // Validate Phone Number (12 digits)
        var phoneInput = document.getElementById('phone');
        if (phoneInput.value.length !== 12) {
            alert('Phone number must be 12 digits');
            return false;
        }

        // Validate CNIC (13 digits)
        var cnicInput = document.getElementById('cnic');
        if (cnicInput.value.length !== 13) {
            alert('CNIC must be 13 digits');
            return false;
        }

        // Validate Profile Picture dimensions
        var profilePictureInput = document.getElementById('profilePicture');
        if (profilePictureInput.files.length > 0) {
            var image = new Image();
            image.src = URL.createObjectURL(profilePictureInput.files[0]);

            image.onload = function () {
                if (image.width < 320 || image.height < 320) {
                    alert('Profile picture dimensions should be minimum 320x320 pixels.');
                    return false;
                }
            };
        }

        return true;
    }

    // Email validation function
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    // document.addEventListener('DOMContentLoaded', function () {
    //     var male = document.getElementById('male');
    //     var female = document.getElementById('female');
    
    //     // Event listeners to handle radio button changes
    //     male.addEventListener('change', function () {
    //       male.checked = false;
    //     });
    
    //     female.addEventListener('change', function () {
    //       female.checked = false;
    //     });
    //   });
   $(function () {
    const skillsSuggestions = ['Chef', 'Gym Instructor', 'Maid', 'Health Care', 'Tutor', 'Event-Planner', 'Make-Up', 'Baby Care', 'Architect'];

    // Display selected skills
    const selectedSkillsContainer = $('#selected-skills-list');

    function initializeAutocomplete(input) {
        input.autocomplete({
            source: function (request, response) {
                const term = request.term.toLowerCase();
                const filteredSuggestions = skillsSuggestions.filter(skill =>
                    skill.toLowerCase().includes(term)
                );
                response(filteredSuggestions);
            },
            position: { my: 'left top', at: 'left bottom', collision: 'none' },
            open: function (event, ui) {
                $(this).autocomplete('widget').css('max-height', '150px');
            },
            messages: {
                noResults: '',
                results: function () {}
            },
            appendTo: $('.skills-container'), 
            select: function (event, ui) {
                // Clears the input value
                input.val('');

                // Add the selected skill to skill list
                const skillValue = ui.item.value;
                if (skillValue) {
                    addSkillToList(skillValue);
                }

                // Prevent the default behavior of pressing enter key
                event.preventDefault();
            }
        })

        input.on('keydown', function (event) {
            // Check if the pressed key is Enter 13 (represents enter key) 
            if (event.which === 13) {
                const skillValue = $(this).val();
                if (skillValue != '') {
                    addSkillToList(skillValue);
                    $(this).val(''); // Clear the input value
                }
                event.preventDefault(); // Prevent the default Enter key behavior
            }
        });
    }

    // Initializing autocomplete for all skill inputs
    const skillInputs = $('.skills-container input.skill-input');
    skillInputs.each(function () {
        initializeAutocomplete($(this));
    });

    $('#add-skill').on('click', function (event) {
        
       event.preventDefault();
       const inputField = $('.skills-container input.skill-input');
       const skillValue = inputField.val();
       if (skillValue !== ''){
        addSkillToList(skillValue);
        inputField.val('')
       }
       
    });

    // Function to add a skill to skill list
    function addSkillToList(skillValue) {
        // Add skill to skill list with oval shape
        selectedSkillsContainer.append('<span class="oval-shape">' + skillValue + '</span>');

        const hiddenInput = $('<input type="hidden" name="skills[]" value="' + skillValue + '">');
        selectedSkillsContainer.append(hiddenInput);
    }
});
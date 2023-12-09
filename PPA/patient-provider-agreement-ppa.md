# Patient Components (PC)

    ## personal information:
            (i) first name
            (ii) last name
            (iii) date of birth
            (iv) gender
            (v) patient id (unique) (PT1000001)
            (vi) ssn
            (vii) driver license
            (viii) passport
            (ix) maritial
            (x) race
            (xi) ethnicity
            (xii) birthplace

    ## contact information:
            (i) phone number
            (ii) email address

    ## mailing address:
            (i) house number
            (ii) street
            (iii) city
            (iv) state
            (v) zip code

    ## pharmacy information:
            (i) farmacy name
            (ii) street
            (iii) city
            (iv) state
            (v) zip code

    ## billing informattion
            (i) bank account name
            (ii) bank account number
            (iii) bank routing number
            (iv) bank branch name
            (v) bank name
    ## main hospital information
            (i) organization id
            (ii) organization name

    ## insurance information
            (i) insurance id
            (ii) insurance company
            (iii) insurance policy number

    ## emergency contract information
            (i) name of emergency contact person (first name, last name)
            (ii) emergency contact phone number
            (iii) relationship
            (iv) address (home, street, city, state, zip)

# Provider Components (PrC)

        doctor, nurse, support staff, lab technician, billing officer

        ## personal information:
            (i) provider id (unique) (PR10000001)
            (ii) tittle
            (iii) first name
            (iv) last name
            (v) date of birth
            (vi) gender
            (vii) qualification
            (viii) speciality

        ## contact information:
            (i) phone number
            (ii) email address

        ## mailing address:
            (i) house number
            (ii) street
            (iii) city
            (iv) state
            (v) zip code

        ## main hospital information
            (i) organization id
            (ii) organization name

        ## emergency contract information
            (i) name of emergency contact person (first name, last name)
            (ii) emergency contact phone number
            (iii) relationship
            (iv) address (home, street, city, state, zip)

# Regulatory and Others Components (ROC)

# Informed Consent Components (ICC)

# Organizations

    # organization id (ORG10001)
    # organization name
    # organization type (hospital(10), clinic(10), emergency room (5), pharmacy(30), private clinic (10), walk in clinic(5), therapy center(5), urgent care(5), insurance company(10))
    # address
    # city
    # state
    # zip
    # phone
    # email

# Pharmacy

        ## personal information:
            (i) pharmacist id (unique)
            (ii) tittle (pharmacist, senior pharmacist, junir pharmacy technician, pharmacy technician, senior pharmacy technician)
            (iii) first name
            (iv) last name
            (v) date of birth
            (vi) gender
            (vii) qualification

        ## pharmacy information
            (i) pharmacy name
            (ii) pharmacy id
            (iii) pharmacy phone
            (iv) pharmacy email
            (v) pharmacy address (road, street, city, state, zip code)

        ## contact information:
            (i) phone number
            (ii) email address

        ## mailing address:
            (i) house number
            (ii) street
            (iii) city
            (iv) state
            (v) zip code

        ## emergency contract information
            (i) name of emergency contact person (first name, last name)
            (ii) emergency contact phone number
            (iii) relationship
            (iv) address (home, street, city, state, zip)

# Insurance Company Agent

        ## personal information:
            (i) employee id (unique)
            (ii) tittle (junir agent, agent, senior agent)
            (iii) first name
            (iv) last name
            (v) date of birth
            (vi) gender
            (vii) qualification

        ## insurance information
            (i) insurance company name
            (ii) insurance company id
            (iii) insurance company phone
            (iv) insurance company email
            (v) insurance company address (road, street, city, state, zip code)

        ## contact information:
            (i) phone number
            (ii) email address

        ## mailing address:
            (i) house number
            (ii) street
            (iii) city
            (iv) state
            (v) zip code

        ## emergency contract information
            (i) name of emergency contact person (first name, last name)
            (ii) emergency contact phone number
            (iii) relationship
            (iv) address (home, street, city, state, zip)

# External Users or Doctors

            doctor

        ## personal information:
            (i) provider id (unique)
            (ii) tittle
            (iii) first name
            (iv) last name
            (v) date of birth
            (vi) gender
            (vii) qualification
            (viii) speciality

        ## external hospital/clinic information
            (i) hospital/clinic company name
            (ii) hospital/clinic company id
            (iii) hospital/clinic company phone
            (iv) hospital/clinic company email
            (v) hospital/clinic  address (road, street, city, state, zip code)
        ## contact information:
            (i) phone number
            (ii) email address

        ## mailing address:
            (i) house number
            (ii) street
            (iii) city
            (iv) state
            (v) zip code

        ## emergency contract information
            (i) name of emergency contact person (first name, last name)
            (ii) emergency contact phone number
            (iii) relationship
            (iv) address (home, street, city, state, zip)

# Provider to Patient Ratio

        Total Patiens # 100000

        ## doctor-to-patient ratio = 1:1000

        ## nurse-to-patient ratio = 1:200

        ## support staff-to-patient ratio = 1:200

        ## lab technician-to-patient ratio = 1:1000

        ## billing officer-to-patient ratio = 1:10000


        ## pharmacist 3 per pharmacy
        ## insurance agent 4 per company
        ## external users

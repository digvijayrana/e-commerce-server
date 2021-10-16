const router = require('express').Router()
const User = require('../../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

router.post('/admin/register', async (req, res) => {
	try {
	const { name, password: plainTextPassword,email,phone,profilePicture,role } = req.body

  if(phone.length<10 && phone.length>10){
    return res.json({ status: 'error', error: 'Invalid Phone' })
  }

	if (!email || typeof email !== 'string') {
		return res.json({ status: false, error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: false, error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	
		const response = await User.create({
			name,password,email,phone,profilePicture,role
		})
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: false, error: 'Username already in use' })
		}

	return res.status(401).json({
        status:false,
        message:error.message
    })
	}

	res.json({ status: false,message:'Successfull' })
})


router.post('/admin/login', async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: false, error: 'Invalid email/password' })
	}

	if (await bcrypt.compare(password, user.password) && user.role ==='admin') {
		// the email, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email
			},
			JWT_SECRET,
			{expiresIn:'1h'}
		)

		return res.json({ status: true, data: token,result:user })
	}

	res.json({ status: false, error: 'Invalid /password' })
})


module.exports = router
const sendgrid = require('sendgrid')
const helper = sendgrid.mail

const { sendGridKey } = require('../configs/keys')

// Sendgrid Node.js Mailer class documentation:
// https://github.com/sendgrid/sendgrid-nodejs#without-mail-helper-class

class Mailer extends helper.Mail {

  constructor({ subject, recipients }, content) {
    super()

    this.sendgridApi = sendgrid(sendGridKey)
    this.from_email = new helper.Email('no-reply@sendgrid-test.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  formatAddresses(recipients) {
    return recipients.map(recipient => new helper.Email(recipient.email))
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)
    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  addRecipients() {
    const personalize = new helper.Personalization()
    this.recipients.forEach(recipient => personalize.addTo(recipient))
    this.addPersonalization(personalize)
  }

  async send() {
    const request = this.sendgridApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    })
    const response = await this.sendgridApi.API(request)
    return response
  }
}

module.exports = Mailer
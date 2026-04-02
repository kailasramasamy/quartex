import type { Platform } from "@quartex/shared"

interface TemplateResult {
  subject: string
  html: string
}

function wrapInLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quartex</title>
</head>
<body style="margin:0;padding:0;background:#0A0F1C;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0F1C;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111827;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #1F2937;text-align:center;">
              <span style="font-size:22px;font-weight:700;color:#3B82F6;letter-spacing:-0.5px;">Quartex</span>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;color:#E5E7EB;font-size:15px;line-height:1.7;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1F2937;text-align:center;color:#6B7280;font-size:12px;">
              <p style="margin:0 0 6px;">Quartex Technologies &bull; quartex.in</p>
              <p style="margin:0;"><a href="#" style="color:#3B82F6;text-decoration:none;">Unsubscribe</a> from beta program emails</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

const btn = (href: string, label: string): string =>
  `<a href="${href}" style="display:inline-block;margin-top:24px;padding:12px 28px;background:#3B82F6;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">${label}</a>`

const h1 = (text: string): string =>
  `<h1 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#fff;">${text}</h1>`

const p = (text: string): string =>
  `<p style="margin:0 0 14px;color:#D1D5DB;">${text}</p>`

interface RegistrationData {
  testerName: string
  appName: string
  platform: Platform
  testLinks: { android?: string; ios?: string; web?: string }
  rewardDescription: string
}

export function registrationConfirmation(data: RegistrationData): TemplateResult {
  const testLink = data.testLinks[data.platform]
  const linkHtml = testLink ? btn(testLink, `Open ${data.appName} on ${data.platform}`) : ""

  const content = `
    ${h1(`Welcome to the ${data.appName} Beta Program!`)}
    ${p(`Hi ${data.testerName}, you're officially part of our beta testing team.`)}
    ${p(`You'll be testing <strong style="color:#fff;">${data.appName}</strong> on <strong style="color:#fff;">${data.platform}</strong>.`)}
    ${p(`As a thank-you for your time, you'll receive: <strong style="color:#3B82F6;">${data.rewardDescription}</strong>`)}
    ${linkHtml}
    ${p(`We'll send you setup instructions shortly. Thanks for helping us build something great.`)}
  `
  return { subject: `Welcome to the ${data.appName} Beta Program!`, html: wrapInLayout(content) }
}

interface TestingInstructionsData {
  testerName: string
  appName: string
  platform: Platform
  testLink: string
  feedbackLink: string
}

export function testingInstructions(data: TestingInstructionsData): TemplateResult {
  const steps = `
    <ol style="margin:16px 0;padding-left:20px;color:#D1D5DB;">
      <li style="margin-bottom:10px;">Click the link below to install or open <strong style="color:#fff;">${data.appName}</strong> on ${data.platform}.</li>
      <li style="margin-bottom:10px;">Use the app normally — explore every screen and feature you can find.</li>
      <li style="margin-bottom:10px;">Note anything that feels broken, confusing, or could be improved.</li>
      <li style="margin-bottom:10px;">Submit your feedback using the feedback form — details matter!</li>
    </ol>
  `
  const content = `
    ${h1(`How to Test ${data.appName} — Getting Started`)}
    ${p(`Hi ${data.testerName}, here's everything you need to start testing.`)}
    ${steps}
    ${btn(data.testLink, `Open ${data.appName}`)}
    <div style="margin-top:20px;">
      ${btn(data.feedbackLink, "Submit Feedback")}
    </div>
  `
  return { subject: `How to Test ${data.appName} — Getting Started`, html: wrapInLayout(content) }
}

interface NewReleaseData {
  testerName: string
  appName: string
  version: string
  platform: Platform
  releaseNotes: string
  downloadLink: string
}

export function newRelease(data: NewReleaseData): TemplateResult {
  const notes = data.releaseNotes
    .split("\n")
    .filter(Boolean)
    .map((n) => `<li style="margin-bottom:8px;">${n}</li>`)
    .join("")

  const content = `
    ${h1(`${data.appName} v${data.version} is here`)}
    ${p(`Hi ${data.testerName}, a new version of <strong style="color:#fff;">${data.appName}</strong> is available for ${data.platform}.`)}
    <p style="margin:0 0 8px;color:#9CA3AF;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">What's new</p>
    <ul style="margin:0 0 20px;padding-left:20px;color:#D1D5DB;">${notes}</ul>
    ${btn(data.downloadLink, `Download v${data.version}`)}
  `
  return {
    subject: `${data.appName} v${data.version} — New Release Available`,
    html: wrapInLayout(content),
  }
}

interface PeriodReminderData {
  testerName: string
  appName: string
  daysRemaining: number
  feedbackLink: string
}

export function periodReminder(data: PeriodReminderData): TemplateResult {
  const urgency = data.daysRemaining <= 3 ? "Don't miss out — " : ""
  const content = `
    ${h1(`${data.daysRemaining} days left in the ${data.appName} beta`)}
    ${p(`Hi ${data.testerName}, just a friendly nudge.`)}
    ${p(`${urgency}you have <strong style="color:#3B82F6;">${data.daysRemaining} day${data.daysRemaining === 1 ? "" : "s"}</strong> remaining in the ${data.appName} testing period.`)}
    ${p(`Your feedback is what makes this better. Even a short note helps — bugs, confusion, or ideas.`)}
    ${btn(data.feedbackLink, "Submit Feedback Now")}
  `
  return {
    subject: `${data.daysRemaining} days left in ${data.appName} beta testing`,
    html: wrapInLayout(content),
  }
}

interface CompletionThanksData {
  testerName: string
  appName: string
  rewardDescription: string
}

export function completionThanks(data: CompletionThanksData): TemplateResult {
  const content = `
    ${h1(`Thank You for Testing ${data.appName}!`)}
    ${p(`Hi ${data.testerName}, the beta testing period has come to a close.`)}
    ${p(`Your contribution to <strong style="color:#fff;">${data.appName}</strong> has been invaluable. The bugs you found, the feedback you shared — it all matters.`)}
    ${p(`Your reward — <strong style="color:#3B82F6;">${data.rewardDescription}</strong> — will be sent to you shortly. We'll follow up with the details.`)}
    ${p(`Thank you for being part of this.`)}
  `
  return { subject: `Thank You for Testing ${data.appName}!`, html: wrapInLayout(content) }
}

interface RewardSentData {
  testerName: string
  appName: string
  rewardDescription: string
}

export function rewardSent(data: RewardSentData): TemplateResult {
  const content = `
    ${h1(`Your ${data.appName} Beta Testing Reward`)}
    ${p(`Hi ${data.testerName}, great news — your reward has been sent!`)}
    ${p(`<strong style="color:#3B82F6;">${data.rewardDescription}</strong> — check your inbox or any relevant app for the details.`)}
    ${p(`Testing takes real effort and you showed up. That means a lot to everyone on the team.`)}
    ${p(`Keep an eye out for future beta programs — we'd love to have you back.`)}
  `
  return { subject: `Your ${data.appName} Beta Testing Reward`, html: wrapInLayout(content) }
}

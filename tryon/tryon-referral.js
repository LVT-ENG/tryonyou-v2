export class ReferralSystem {
  constructor() {
    this.invitations = new Map(); // refCode -> { email, redeemed }
  }

  generateCode(email) {
    const code = email.split('@')[0] + '-' + Math.random().toString(36).substring(2, 6);
    this.invitations.set(code, { email, redeemed: false });
    return code;
  }

  redeemCode(code) {
    const invite = this.invitations.get(code);
    if (invite && !invite.redeemed) {
      invite.redeemed = true;
      return invite.email;
    }
    return null;
  }

  getPending() {
    return Array.from(this.invitations.entries()).filter(([_, v]) => !v.redeemed);
  }
}

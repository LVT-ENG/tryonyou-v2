console.log('Auto deploy script loaded');

export function triggerAutoDeploy() {
  fetch('/api/deploy', { method: 'POST' })
    .then(resp => resp.ok && console.log('Deployment triggered'))
    .catch(err => console.error('Deploy error', err));
}

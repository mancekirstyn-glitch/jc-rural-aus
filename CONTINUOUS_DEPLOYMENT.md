# JC Rural AUS — Continuous Deployment Setup

## Overview

This project is configured for continuous deployment (CD) using GitHub Actions and Manus webdev. Every push to the `main` branch automatically triggers a build process and deploys the updated site to your live domain.

---

## How It Works

### Deployment Flow

```
1. Push to GitHub (main branch)
   ↓
2. GitHub Actions workflow triggered
   ↓
3. Dependencies installed (pnpm)
   ↓
4. Type checking (TypeScript validation)
   ↓
5. Build process (Vite compilation)
   ↓
6. Manus webdev detects changes
   ↓
7. Live site updated automatically
```

### Live Site URL

Your deployed site is available at:
```
https://jcruralaus-gy2gepc3.manus.space
```

---

## GitHub Actions Workflow

### Workflow File Location

`.github/workflows/deploy.yml`

### What the Workflow Does

#### Build & Test Phase
- **Checkout code:** Retrieves the latest code from GitHub
- **Setup Node.js:** Configures Node.js 22.x runtime
- **Install dependencies:** Runs `pnpm install --frozen-lockfile`
- **Type checking:** Validates TypeScript with `pnpm run check`
- **Build project:** Compiles the site with `pnpm run build`
- **Verify output:** Confirms the build artifact exists

#### Deploy Phase
- **Runs only on:** Pushes to the `main` branch (not on pull requests)
- **Notification:** Logs deployment details and live site URL
- **Automatic deployment:** Manus webdev automatically detects changes and deploys

### Workflow Status

View the status of all deployments:
1. Go to your GitHub repository: https://github.com/jccrafterwork-source/jc-rural-aus
2. Click the **Actions** tab
3. View workflow runs and their status

---

## Making Changes & Deploying

### Step 1: Make Changes Locally

Edit files in your local repository:
```bash
cd /home/ubuntu/jc-rural-aus
# Edit files (e.g., client/src/pages/Home.tsx)
```

### Step 2: Commit Changes

```bash
git add .
git commit -m "Update: Brief description of changes"
```

### Step 3: Push to GitHub

```bash
git push github main
```

### Step 4: Automatic Deployment

The GitHub Actions workflow automatically:
- Validates your code
- Builds the project
- Deploys to the live site

### Step 5: Verify Deployment

1. Check GitHub Actions status: https://github.com/jccrafterwork-source/jc-rural-aus/actions
2. Visit your live site: https://jcruralaus-gy2gepc3.manus.space
3. Verify changes are live (may take 30–60 seconds)

---

## Common Deployment Scenarios

### Scenario 1: Update Service Rates

**File to edit:** `client/src/pages/Home.tsx`

```typescript
const services = [
  {
    number: "01",
    title: "Lamb marking",
    rate: "$2.50", // ← Update rate
    unit: "per head",
  },
  // ... other services
];
```

**Deploy:**
```bash
git add client/src/pages/Home.tsx
git commit -m "Update lamb marking rate to $2.50"
git push github main
```

### Scenario 2: Update Contact Information

**File to edit:** `client/src/pages/Home.tsx`

Update phone, email, or social links in the constants at the top of the file.

**Deploy:**
```bash
git add client/src/pages/Home.tsx
git commit -m "Update contact phone number"
git push github main
```

### Scenario 3: Update Styling

**File to edit:** `client/src/index.css`

Modify colors, fonts, spacing, or other design tokens.

**Deploy:**
```bash
git add client/src/index.css
git commit -m "Update brand colors for seasonal campaign"
git push github main
```

---

## Monitoring Deployments

### GitHub Actions Dashboard

**View all deployments:**
1. Go to: https://github.com/jccrafterwork-source/jc-rural-aus/actions
2. Click on a workflow run to see detailed logs
3. Check for ✓ (success) or ✗ (failure) status

### Workflow Run Details

Each workflow run shows:
- **Commit message:** What changes were deployed
- **Author:** Who made the changes
- **Timestamp:** When the deployment occurred
- **Status:** Success or failure
- **Build logs:** Detailed output from each step

### Troubleshooting Failed Deployments

If a deployment fails:

1. **Check the workflow logs:**
   - Go to Actions tab
   - Click the failed run
   - Expand the step that failed
   - Review the error message

2. **Common failure causes:**
   - **TypeScript errors:** Fix type errors in your code
   - **Build errors:** Check for syntax errors or missing dependencies
   - **Missing files:** Ensure all required files are committed to Git

3. **Fix and redeploy:**
   ```bash
   # Fix the issue locally
   git add .
   git commit -m "Fix: Resolve build error"
   git push github main
   ```

---

## Deployment Best Practices

### 1. Test Changes Locally Before Pushing

```bash
# Run the development server
pnpm run dev

# Visit http://localhost:3000 to test changes
# Make sure everything works before pushing
```

### 2. Use Descriptive Commit Messages

```bash
# ✓ Good
git commit -m "Update: Add new fencing service rates for 2026"

# ✗ Avoid
git commit -m "Update stuff"
```

### 3. Make Atomic Commits

Each commit should represent a single logical change:
```bash
# ✓ Good: One change per commit
git commit -m "Update contact phone number"
git commit -m "Fix typo in services section"

# ✗ Avoid: Multiple unrelated changes
git commit -m "Update phone, fix typo, change colors"
```

### 4. Review Changes Before Pushing

```bash
# See what you're about to push
git diff

# See staged changes
git diff --staged
```

### 5. Monitor Deployments

After pushing, check the Actions tab to ensure the deployment succeeds.

---

## Rollback & Recovery

### Rollback to Previous Version

If a deployment introduces issues, you can quickly rollback:

```bash
# View commit history
git log --oneline

# Revert to a previous commit
git revert <commit-hash>

# Push the revert
git push github main
```

### Example Rollback

```bash
# See recent commits
$ git log --oneline -5
f17bb99 Add UTM tracking to social and business profile links
908aa06 Build JC Rural AUS landing page
6a3f2d9 Initial project bootstrap

# Revert to the landing page version
$ git revert f17bb99
$ git push github main
```

---

## Advanced Configuration

### Disable Auto-Deployment

To prevent automatic deployments (e.g., during testing):

1. Go to GitHub repository settings
2. Navigate to **Branches > main**
3. Enable **Require status checks to pass before merging**
4. This ensures code is reviewed before deployment

### Environment Variables

All environment variables are managed in `.project-config.json` and automatically injected during deployment. No additional setup is required.

### Secrets Management

For sensitive data (API keys, tokens):
1. Go to GitHub repository settings
2. Navigate to **Secrets and variables > Actions**
3. Add secrets as needed
4. Reference in workflow: `${{ secrets.SECRET_NAME }}`

---

## Performance & Caching

### Build Caching

The workflow uses pnpm cache to speed up subsequent builds:
- Dependencies are cached between runs
- Cache is invalidated when `pnpm-lock.yaml` changes
- Typical build time: 2–5 minutes

### Deployment Time

- **Build & test:** 2–5 minutes
- **Manus deployment:** 30–60 seconds
- **Total:** ~3–6 minutes from push to live

---

## Monitoring & Analytics

### Track Deployment Activity

1. **GitHub Actions:** View all deployments and their status
2. **Manus Dashboard:** Monitor site performance and uptime
3. **Analytics:** Track visitor engagement using UTM parameters

### Deployment Metrics

Monitor these metrics to ensure healthy deployments:
- **Success rate:** Percentage of successful deployments
- **Build time:** How long builds take
- **Deployment frequency:** How often you deploy
- **Lead time:** Time from commit to live deployment

---

## Next Steps

1. **Make your first change:** Edit a file locally and push to test the workflow
2. **Monitor the deployment:** Check GitHub Actions and your live site
3. **Set up branch protection:** Require status checks before merging to main
4. **Add team collaboration:** Invite collaborators to the GitHub repository
5. **Monitor analytics:** Track visitor engagement using the UTM parameters

---

## Support & Resources

### Useful Links

- **GitHub Actions Documentation:** https://docs.github.com/en/actions
- **Manus Webdev Docs:** https://manus.im/docs
- **pnpm Documentation:** https://pnpm.io/
- **Vite Documentation:** https://vitejs.dev/

### Troubleshooting

**Q: My deployment failed. What should I do?**
A: Check the GitHub Actions logs for the specific error. Common issues are TypeScript errors or missing dependencies. Fix the issue locally, commit, and push again.

**Q: How long does deployment take?**
A: Typically 3–6 minutes from push to live. The first deployment may take longer due to dependency installation.

**Q: Can I deploy from a different branch?**
A: Currently, only the `main` branch triggers automatic deployment. You can modify `.github/workflows/deploy.yml` to add other branches.

**Q: How do I preview changes before deploying to production?**
A: Run `pnpm run dev` locally to test changes. You can also create a staging branch and manually test before merging to `main`.

---

## Deployment Checklist

Before pushing to production:

- [ ] Changes tested locally (`pnpm run dev`)
- [ ] No TypeScript errors (`pnpm run check`)
- [ ] Build succeeds locally (`pnpm run build`)
- [ ] Commit message is descriptive
- [ ] All files are staged and committed
- [ ] Ready to push to GitHub

After deployment:

- [ ] GitHub Actions workflow completed successfully
- [ ] Live site updated (check https://jcruralaus-gy2gepc3.manus.space)
- [ ] Changes are visible and working correctly
- [ ] No console errors in browser DevTools
- [ ] Analytics tracking is functioning

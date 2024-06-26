# Double-container Dockerfile for separated build process.
# If you're just copy-pasting this, don't forget a .dockerignore!

# We're starting with the same base image, but we're declaring
# that this block outputs an image called DEPS that we
# won't be deploying - it just installs our Yarn deps
FROM node:18-alpine AS deps

# If you need libc for any of your deps, uncomment this line:
RUN apk add --no-cache libc6-compat

# Copy over ONLY the package.json and yarn.lock
# so that this `yarn install` layer is only recomputed
# if these dependency files change. Nice speed hack!

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --force

# END DEPS IMAGE

# Now we make a container to handle our Build
FROM node:18-alpine AS builder

# Set up our work directory again
WORKDIR /app

# Bring over the deps we installed and now also
# the rest of the source code to build the Next
# server for production
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application
RUN npm run build

# END OF BUILD_IMAGE

# This starts our application's run image - the final output of build.
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Pull the built files out of BUILD_IMAGE - we need:
# 1. the package.json and yarn.lock
# 2. the Next build output and static files
# 3. the node_modules.

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 4. OPTIONALLY the next.config.js, if your app has one
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js  ./

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
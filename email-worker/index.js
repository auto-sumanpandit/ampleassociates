/**
 * Email Worker for @ampleassociates.com addresses that forward to more than one inbox.
 *
 * An Email Routing rule can only forward to one destination, so rules for these
 * addresses send the message here instead and this Worker forwards a copy to each
 * inbox. Every destination must be a verified Email Routing destination address.
 * Single-inbox addresses (contact@) use a plain forwarding rule, not this Worker.
 */
const ROUTES = {
  "suraj@ampleassociates.com": ["digitalsurajgiri@gmail.com", "sumanpandituk@gmail.com"],
};

const worker = {
  async email(message) {
    const destinations = ROUTES[message.to.toLowerCase()];
    if (!destinations) {
      message.setReject("Unknown address");
      return;
    }
    const results = await Promise.allSettled(destinations.map((to) => message.forward(to)));
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`Forward of ${message.to} to ${destinations[i]} failed: ${result.reason}`);
      }
    });
    if (results.every((result) => result.status === "rejected")) {
      message.setReject("Could not deliver");
    }
  },
};

export default worker;

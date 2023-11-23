export const load = ({ locals }) => {
  return { profile: locals.session?.data?.profile };
};

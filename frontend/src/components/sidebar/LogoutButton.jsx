import {BiLogOut} from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
const LogoutButton = () => {
  const {loading, logout} = useLogout();
  return (
    <div className="mt-auto ">
        {!loading ? (
          <BiLogOut className="w-6 h-6 text-white cursor-pointer" 
          onClick={logout}
        />
        ) : (
          <span className="loading loading-spinner"></span>
        )}
    </div>
  )
}

export default LogoutButton

/*
Note: mt-auto:

In flexbox layouts, the auto keyword in margin properties (such as mt-auto) can have a special behavior. When you set a margin to auto on a flex item within a flex container, it will absorb any available space along the main axis of the container, pushing the item as far as possible in the direction of that axis.
So, when you use mt-auto on a flex item in a flex container with a column direction (where the main axis is vertical), it effectively pushes the item to the bottom of the container because it absorbs all the available space above it, pushing the item downward. This behavior is often used to align flex items along the main axis in flexbox layouts.
*/
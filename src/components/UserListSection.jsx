const UserListSection = ({ users = [] }) => {
    return (
        <section>
            <h2 className="text-lg font-bold mb-4">참가 유저</h2>
            <ul className="space-y-2">
                {users.map((user, idx) => (
                    <li
                        key={idx}
                        className="border p-3 rounded-lg shadow-sm bg-gray-50 flex justify-between items-center"
                    >
                        <span className="text-sm text-gray-500">
                        <span className=""> {user.team}팀 </span>
                        <span className="font-medium">{user.name}</span>
                        </span>
                        <span className="text-sm text-blue-600 font-semibold">{user.points}P</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default UserListSection

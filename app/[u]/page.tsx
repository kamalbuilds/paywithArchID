import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Pagination } from "@/components/ui/pagination"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                alt="User Profile"
                className="rounded-full"
                height={80}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "80/80",
                  objectFit: "cover",
                }}
                width={80}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-500 dark:text-gray-400">Archid User</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-medium">Description</h3>
              <p className="text-gray-500 dark:text-gray-400">This is a sample description for the Archid user.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Created:</p>
                  <p>2023-04-01</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Expires:</p>
                  <p>2024-04-01</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Domain:</p>
                  <p>example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Subdomains</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Resolver</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>subdomain1.example.com</TableCell>
                <TableCell>0x1234567890abcdef</TableCell>
                <TableCell>2023-04-01</TableCell>
                <TableCell>2024-04-01</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>subdomain2.example.com</TableCell>
                <TableCell>0x0987654321fedcba</TableCell>
                <TableCell>2023-05-01</TableCell>
                <TableCell>2024-05-01</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>subdomain3.example.com</TableCell>
                <TableCell>0x1a2b3c4d5e6f7g8h</TableCell>
                <TableCell>2023-06-01</TableCell>
                <TableCell>2024-06-01</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4">
            <Pagination />
          </div>
        </div>
        <div className="col-span-2 bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Accounts</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Verification Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>johndoe</TableCell>
                <TableCell>
                  <Link href="#">View Profile</Link>
                </TableCell>
                <TableCell>Personal</TableCell>
                <TableCell>0x1234567890abcdef</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>janedoe</TableCell>
                <TableCell>
                  <Link href="#">View Profile</Link>
                </TableCell>
                <TableCell>Business</TableCell>
                <TableCell>0x0987654321fedcba</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>bobsmith</TableCell>
                <TableCell>
                  <Link href="#">View Profile</Link>
                </TableCell>
                <TableCell>Developer</TableCell>
                <TableCell>0x1a2b3c4d5e6f7g8h</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4">
            <Pagination />
          </div>
        </div>
        <div className="col-span-2 bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Websites</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Verification Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Link href="#">example.com</Link>
                </TableCell>
                <TableCell>example.com</TableCell>
                <TableCell>0x1234567890abcdef</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Link href="#">subdomain.example.com</Link>
                </TableCell>
                <TableCell>example.com</TableCell>
                <TableCell>0x0987654321fedcba</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Link href="#">anothersite.com</Link>
                </TableCell>
                <TableCell>anothersite.com</TableCell>
                <TableCell>0x1a2b3c4d5e6f7g8h</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

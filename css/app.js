<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luxe Haven Hotel Management System</title>
    <style>
        /* Global Styles */
        :root {
            --primary-color: #3498db;
            --secondary-color: #2ecc71;
            --accent-color: #e74c3c;
            --background-color: #f3f4f6;
            --text-color: #2c3e50;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }

        body {
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
        }

        /* Navigation Styles */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--primary-color);
            padding: 1rem 5%;
            color: white;
            animation: slideDown 0.5s ease;
        }

        .navbar a {
            color: white;
            text-decoration: none;
            margin: 0 15px;
            transition: transform 0.3s ease;
        }

        .navbar a:hover {
            transform: scale(1.1);
            color: var(--secondary-color);
        }

        /* Page Container */
        .container {
            width: 90%;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border-radius: 10px;
            animation: fadeIn 1s ease;
        }

        /* Room Booking Section */
        .room-booking {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .room-card {
            background-color: var(--background-color);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            transition: transform 0.3s ease;
        }

        .room-card:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        /* Form Styles */
        .form-group {
            margin-bottom: 15px;
        }

        input, select, button, textarea {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid var(--primary-color);
            border-radius: 5px;
        }

        button {
            background-color: var(--secondary-color);
            color: white;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: var(--accent-color);
        }

        /* Animations */
        @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .navbar {
                flex-direction: column;
            }
            .room-booking {
                grid-template-columns: 1fr;
            }
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="logo">Luxe Haven Hotel</div>
        <div class="nav-links">
            <a href="#home">Home</a>
            <a href="#rooms">Rooms</a>
            <a href="#booking">Booking</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <a href="#receipt">Receipt</a>
        </div>
    </nav>

    <!-- Home Section -->
    <div id="home" class="container">
        <h1>Welcome to Luxe Haven Hotel</h1>
        <p>Experience luxury and comfort like never before.</p>
    </div>

    <!-- Booking Section -->
    <div id="booking" class="container">
        <h2>Book Your Stay</h2>
        <form id="booking-form">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="room-type">Room Type</label>
                <select id="room-type" name="room-type" required>
                    <option value="">Select Room Type</option>
                    <option value="standard">Standard Room</option>
                    <option value="deluxe">Deluxe Suite</option>
                    <option value="presidential">Presidential Suite</option>
                </select>
            </div>
            <div class="form-group">
                <label for="check-in">Check-in Date</label>
                <input type="date" id="check-in" name="check-in" required>
            </div>
            <div class="form-group">
                <label for="check-out">Check-out Date</label>
                <input type="date" id="check-out" name="check-out" required>
            </div>
            <button type="submit">Confirm Booking</button>
        </form>
    </div>

    <script>
        // Price details for room types
        const roomPrices = {
            "standard": 100,
            "deluxe": 250,
            "presidential": 500
        };

        // Handle booking form submission
        document.getElementById('booking-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const roomType = document.getElementById('room-type').value;
            const checkInDate = document.getElementById('check-in').value;
            const checkOutDate = document.getElementById('check-out').value;

            // Calculate the number of nights
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            const timeDifference = checkOut - checkIn;
            const numberOfNights = timeDifference / (1000 * 3600 * 24);

            // Calculate the price based on the selected room type
            const roomPrice = roomPrices[roomType];
            const totalAmount = roomPrice * numberOfNights;

            // Generate PDF receipt using jsPDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.text('Luxe Haven Hotel - Booking Confirmation', 20, 20);
            doc.text('--------------------------------------', 20, 30);
            doc.text(`Name: ${name}`, 20, 40);
            doc.text(`Email: ${email}`, 20, 50);
            doc.text(`Room Type: ${roomType.charAt(0).toUpperCase() + roomType.slice(1)} Room`, 20, 60);
            doc.text(`Check-in Date: ${checkInDate}`, 20, 70);
            doc.text(`Check-out Date: ${checkOutDate}`, 20, 80);
            doc.text(`Number of Nights: ${numberOfNights}`, 20, 90);
            doc.text(`Total Amount: $${totalAmount}`, 20, 100);

            // Save the PDF
            doc.save('booking_receipt.pdf');
        });
    </script>
</body>
</html>

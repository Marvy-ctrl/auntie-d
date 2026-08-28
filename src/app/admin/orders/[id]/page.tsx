"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { myCustomFont } from "../../../fonts/fonts";

export default function AdminOrderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params?.id as string;

    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

    // Fetch individual order details
    useEffect(() => {
        async function fetchOrderDetails() {
            if (!orderId) return;
            try {
                const res = await fetch(`${baseUrl}/api/orders/${orderId}`, {
                    credentials: 'include',
                });
                if (res.ok) {
                    const json = await res.json();
                    setOrder(json.data || json.order || json);
                } else {
                    throw new Error("Failed to fetch order");
                }
            } catch (err) {
                console.error("Error loading order:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchOrderDetails();
    }, [orderId, baseUrl]);



    const handleUpdateStatus = async (newStatus: string, newPaymentStatus?: string) => {
        setIsUpdating(true);
        setSuccessMessage("");

        try {
            const payload: any = {};
            if (newStatus) payload.status = newStatus;
            if (newPaymentStatus) payload.paymentStatus = newPaymentStatus;

            const res = await fetch(`${baseUrl}/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // <-- Add this line to send auth cookies
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorJson = await res.json();
                throw new Error(errorJson.error || "Failed to update order status");
            }

            const json = await res.json();
            const updated = json.data || json.order || json;
            setOrder(updated);
            setSuccessMessage("Order status updated successfully!");
            setTimeout(() => setSuccessMessage(""), 4000);
        } catch (err: any) {
            console.error("Update error:", err);
            alert(`Could not update order: ${err.message}`);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#1A3626]" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className={`${myCustomFont.className} max-w-4xl mx-auto py-12 px-4 text-center`}>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Order not found</h2>
                <Link href="/admin/orders" className="text-sm font-bold text-[#1A3626]">
                    &larr; Back to Orders List
                </Link>
            </div>
        );
    }

    const calculatedTotal = order.items?.reduce((acc: number, item: any) => acc + (Number(item.unitPrice || item.price || 0) * Number(item.quantity || 0)), 0) || order.total || 0;

    return (
        <div className={`${myCustomFont.className} max-w-4xl mx-auto py-8 px-4 sm:px-6`}>

            {/* Back Link & Header */}
            <div className="flex items-center justify-between mb-6">
                <Link href="/admin/orders" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1A3626] transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Orders
                </Link>
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                    Ref: {order.orderNumber || order.id}
                </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Order Actions & Details</h1>
                    <p className="text-xs text-slate-500 mt-1">Manage fulfillment stage and update payment verification status.</p>
                </div>
            </div>

            {successMessage && (
                <div className="mb-6 text-emerald-800 text-sm p-4 flex items-center gap-2">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="mb-6 text-red-800 text-sm p-4 flex items-center gap-2">
                    {errorMessage}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left 2 Columns: Order Info & Items */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Customer & Delivery Card */}
                    <div className="bg-white p-6 border border-slate-100 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Customer & Shipping Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="bg-slate-50 p-3.5">
                                <p className="text-slate-400 font-bold mb-1">Customer Name</p>
                                <p className="text-slate-800 font-semibold text-sm">{order.customerName || order.customer || "Guest Customer"}</p>
                            </div>
                            <div className="bg-slate-50 p-3.5">
                                <p className="text-slate-400 font-bold mb-1">Phone Number</p>
                                <p className="text-slate-800 font-semibold text-sm">{order.customerPhone || order.phone || "Not provided"}</p>
                            </div>
                            <div className="bg-slate-50 p-3.5 sm:col-span-2">
                                <p className="text-slate-400 font-bold mb-1">Delivery Address</p>
                                <p className="text-slate-800 font-semibold text-sm">{order.deliveryAddress || order.address || "Not specified"}</p>
                            </div>
                            {order.customerNote && (
                                <div className="bg-slate-50 p-3.5 sm:col-span-2">
                                    <p className="text-slate-400 font-bold mb-1">Customer Notes / Instructions</p>
                                    <p className="text-slate-800 italic text-sm">{order.customerNote}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Included Items Table */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Included Items</h3>
                        <div className="space-y-3">
                            {order.items?.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center text-xs py-3 bg-slate-50 px-4">
                                    <div>
                                        <span className="font-bold text-slate-900">{item.productName || item.name}</span>
                                        <span className="text-slate-500 ml-2">({item.variantLabel || item.variant || "Standard"}) x {item.quantity}</span>
                                    </div>
                                    <span className="font-bold text-[#1A3626]">₦{(Number(item.unitPrice || item.price || 0) * Number(item.quantity || 0)).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-sm font-bold">
                            <span className="text-slate-600">Total Amount:</span>
                            <span className="text-lg text-[#1A3626]">₦{Number(calculatedTotal).toLocaleString()}</span>
                        </div>
                    </div>

                </div>

                {/* Right Column: Status Controls & Actions */}
                <div className="space-y-6">

                    {/* Order Fulfillment Status Actions */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            Update Order Status
                        </h3>
                        <p className="text-xs text-slate-500">Select the current fulfillment stage for this order:</p>

                        <div className="space-y-2 pt-2">
                            {[
                                { label: 'Awaiting Confirmation', value: 'AWAITING_CONFIRMATION' },
                                { label: 'Confirmed', value: 'CONFIRMED' },
                                { label: 'Processing', value: 'PROCESSING' },
                                { label: 'Ready for Dispatch', value: 'READY_FOR_DISPATCH' },
                                { label: 'Dispatched', value: 'DISPATCHED' },
                                { label: 'Delivered', value: 'DELIVERED' },
                                { label: 'Cancelled', value: 'CANCELLED' },
                            ].map((st) => {
                                const isActive = (order.status || 'AWAITING_CONFIRMATION') === st.value;
                                return (
                                    <button
                                        key={st.value}
                                        disabled={isUpdating || isActive}
                                        onClick={() => handleUpdateStatus(st.value, undefined)}
                                        className={`w-full py-3 px-4 text-xs font-bold transition-all flex items-center justify-between ${isActive
                                                ? 'bg-[#1A3626] text-white'
                                                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                                            }`}
                                    >
                                        <span>{st.label}</span>
                                        {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Payment Status Actions */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            Payment Status
                        </h3>
                        <p className="text-xs text-slate-500">Toggle payment verification status:</p>

                        <div className="grid grid-cols-2 gap-2 pt-2">
                            {[
                                { label: 'Unpaid', value: 'UNPAID' },
                                { label: 'Paid', value: 'PAID' },
                            ].map((pay) => {
                                const isPayActive = (order.paymentStatus || 'UNPAID') === pay.value;
                                return (
                                    <button
                                        key={pay.value}
                                        disabled={isUpdating || isPayActive}
                                        onClick={() => handleUpdateStatus('', pay.value)}
                                        className={`py-2.5 px-3 text-xs font-bold transition-all text-center ${isPayActive
                                                ? 'bg-emerald-700 text-white'
                                                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                                            }`}
                                    >
                                        {pay.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
